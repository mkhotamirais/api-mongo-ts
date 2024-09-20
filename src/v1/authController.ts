import { compare, genSalt, hash } from "bcrypt";
import { Users, UserType } from "./models";
import jwt from "jsonwebtoken";
import validator from "validator";
import { Request, Response } from "express";

const ats = process.env.ACCESS_TOKEN_SECRET as string;

export const signup = async (req: Request, res: Response) => {
  const { name, email, password, confPassword, role } = req.body;
  try {
    if (!name) return res.status(400).json({ error: "Name is required!" });
    if (!email) return res.status(400).json({ error: "Email is required!" });
    if (!password) return res.status(400).json({ error: "Password is required!" });

    const dupName = await Users.findOne({ name });
    const dupEmail = await Users.findOne({ email });
    if (dupName) return res.status(409).json({ error: "Duplicate name!" });
    if (dupEmail) return res.status(409).json({ error: "Duplicate email!" });
    if (!validator.isEmail(email)) return res.status(400).json({ error: "Email is invalid!" });

    if (password !== confPassword) return res.status(400).json({ error: "Wrong confirm password!" });
    const salt = await genSalt(10);
    const hashPass = await hash(password, salt);
    req.body.password = hashPass;
    if (role && role === "admin") {
      req.body.role = "user";
    } else if (email === "ahmad@gmail.com") {
      req.body.role = "admin";
    }

    await Users.create(req.body);
    res.status(201).json({ message: `Register ${name} success` });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email) return res.status(400).json({ error: `Email is required!` });
    if (!password) return res.status(400).json({ error: `Password is required!` });

    const existingEmail = await Users.findOne({ email });
    if (!existingEmail) return res.status(400).json({ error: "Incorrect email!" });
    const matchPass = await compare(password, existingEmail.password as string);
    if (!matchPass) return res.status(400).json({ error: "Incorrect password!" });

    const { _id: id, name, role } = existingEmail;
    const accessToken = jwt.sign({ id, name, role }, ats, { expiresIn: "1d" });
    res.cookie("accessTokenV1", accessToken, {
      secure: true,
      httpOnly: true,
      // maxAge: 30 * 24 * 60 * 60 * 1000,
      // sameSite: "lax", //
      sameSite: "none",
      path: "/",
    });

    await Users.findOneAndUpdate({ email }, { $push: { accessToken } }, { new: true }).select(["-__v", "-password"]);

    res.status(200).json({ message: `Login ${email} success` });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }
};

// token required
export const signout = async (req: Request, res: Response) => {
  try {
    const accessToken = req.cookies.accessTokenV1;
    const existingDataToken = await Users.findOne({ accessToken: { $in: accessToken } });
    if (!existingDataToken) return res.status(403).json({ error: `forbidden, token invalid` });
    res.clearCookie(`accessTokenV1`, {
      secure: true,
      httpOnly: true,
      // maxAge: 30 * 24 * 60 * 60 * 1000,
      // sameSite: "lax", //
      sameSite: "none",
      path: "/",
    });
    await Users.findByIdAndUpdate(existingDataToken._id, { $pull: { accessToken } }, { new: true });
    res.status(200).json({ message: `Logout ${existingDataToken.name} success` });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const existingDataToken = await Users.findOne({ accessToken: { $in: req.cookies.accessTokenV1 } }).select([
      "-__v",
      "-password",
      "-accessToken",
    ]);
    if (!existingDataToken) return res.status(403).json({ error: `forbidden, accessToken tidak valid` });
    res.status(200).json(existingDataToken);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }
};

export const updateMe = async (req: Request, res: Response) => {
  try {
    const existingDataToken = await Users.findOne({
      accessToken: { $in: req.cookies.accessTokenV1 },
    });
    if (!existingDataToken) return res.status(403).json({ error: `forbidden: token tidak valid` });
    if (existingDataToken.role !== "admin" && req.body.role === "admin")
      return res.status(400).json({ error: `user cannot be an admin without admin permission` });
    if (existingDataToken.email === "ahmad@gmail.com" && req.body.role === "user")
      return res.status(400).json({ error: `You are primary admin you cannot be the user` });

    const { password, confPassword } = req.body;
    if (password) {
      if (password !== confPassword) return res.status(400).json({ error: `confirm password wrong` });
      const salt = await genSalt(10);
      req.body.password = await hash(password, salt);
    } else {
      req.body.password = existingDataToken.password;
    }
    await Users.findByIdAndUpdate(existingDataToken._id, req.body, { new: true });
    res.status(200).json({ message: `Update your account success` });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }
};

export const deleteMe = async (req: Request, res: Response) => {
  try {
    const existingDataToken: UserType | null = await Users.findOne({
      accessToken: { $in: req.cookies.accessTokenV1 },
    });
    if (!existingDataToken) return res.status(403).json({ error: `forbidden: token tidak valid` });
    if (existingDataToken.role === "admin")
      return res.status(400).json({ error: `role admin cannot be deleted, change role first` });
    if (existingDataToken?.email === "ahmad@gmail.com")
      return res.status(400).json({ error: `The primary admin cannot be deleted` });
    await Users.findByIdAndDelete(existingDataToken._id);
    res.status(200).json({ message: `Delete your account success` });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }
};
