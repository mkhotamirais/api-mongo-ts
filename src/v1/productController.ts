import { Request, Response } from "express";

export const readProducts = async (req: Request, res: Response) => {
  const data = [{ name: "prod1" }, { name: "prod2" }];
  req.timestamp = Date.now();
  console.log(req.timestamp);
  console.log("controller");
  try {
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
};
