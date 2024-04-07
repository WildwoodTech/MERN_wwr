import { Request, Response, NextFunction } from "express";
import { Server } from "socket.io";

export default interface ICustomRequest extends Request {
  io?: Server;
  body: {
    name?: string;
    email?: string;
    serviceId?: string;
    newServiceId?: string;
    serviceTime?: Date;
    userseats?: number;
    userpin?: number;
    students?: {
      nursery?: number;
      twoyears?: number;
      threeyears?: number;
      fouryears?: number;
      kindergarten?: number;
      wildlife?: number;
    };
    password?: string;
    pin?: number;
  };
}

export type ExpressHandler = (
  req: ICustomRequest,
  res: Response,
  next: NextFunction
) => Promise<any>;
