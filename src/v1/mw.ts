import jwt from "jsonwebtoken";
import { Users } from "./models";
const ats = process.env.ACCESS_TOKEN_SECRET as string;
import { Request, Response, NextFunction } from "express";

type JwtPayload = {
  id: string;
  name: string;
  role: "user" | "admin";
};

export const isLogin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessTokenV1;
  if (!token) return res.status(401).json({ error: `unauthorized, your not logged in` });
  jwt.verify(token, ats, async (error: any, decoded: any) => {
    if (error) return res.status(403).json({ error: `forbidden: token invalid` });
    const decodedPayload = decoded as JwtPayload | undefined;
    if (decodedPayload) {
      try {
        const user = await Users.findById(decoded.id).select(["-__v", "-password"]);
        if (!user) return res.status(404).json({ error: `user not found` });
        (req as any).user = user;
        next();
      } catch (error) {
        return res.status(500).json({ error: `internal server error` });
      }
    } else {
      return res.status(403).json({ error: `forbidden: token invalid` });
    }
  });
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if ((req as any).user.role !== "admin") return res.status(403).json({ error: `admin only` });
  next();
};
