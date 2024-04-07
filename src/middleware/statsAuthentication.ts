import { Response, NextFunction } from "express";
import ICustomRequest from "../types";

const statsAuthentication = async (
  req: ICustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.body.password === <string>process.env.STATS_PASS) {
    return next();
  }
  res.status(404).json({ success: false });
};

export default statsAuthentication;
