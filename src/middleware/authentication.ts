import { NextFunction, Response } from "express";
import ICustomRequest from "../types";

const authentication = async (
  req: ICustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (
    req.body.password === <string>process.env.ADMIN_PASSWORD &&
    req.body.pin === parseInt(<string>process.env.ADMIN_PIN)
  ) {
    return next();
  }
  res.status(404).json({ success: false, message: "requires authentication" });
};

export default authentication;
