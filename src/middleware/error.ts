import { NextFunction, Response } from "express";
import ICustomRequest from "../types";
import ErrorResponse from "../utils/errorResponse";

const errorHandler = (
  err: any,
  req: ICustomRequest,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };

  error.message = err.message;

  if (err.message === "user not found") {
    const message = `user not found`;
    error = new ErrorResponse(message, 404);
  }

  if (err.name === "CastError") {
    const message = `resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  if (err.name == "ValidationError") {
    const message = error.message;
    error = new ErrorResponse(message, 406);
  }

  if (err._message == "Service validation failed") {
    const message = `error`;
    error = new ErrorResponse(message, 405);
  }

  if (err.code === 11000) {
    const message = `error`;
    error = new ErrorResponse(message, 409);
  }

  res.status(error.statusCode || 404).json({
    success: false,
    error: error.message || "server error",
  });
};

export default errorHandler;
