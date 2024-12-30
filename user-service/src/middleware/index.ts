import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ApiError } from "../utils";
import { isProdEnv } from "../config/config";

export const errorConverter: ErrorRequestHandler = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode ||
      (error instanceof Error
        ? 400 // Bad Request
        : 500); // Internal Server Error
    const message =
      error.message ||
      (statusCode === 400 ? "Bad Request" : "Internal Server Error");
    error = new ApiError(statusCode, message, false, err.stack.toString());
  }
  next(error);
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (isProdEnv && !err.isOperational) {
    statusCode = 500;
    message = "Internal Server Error";
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(!isProdEnv && { stack: err.stack }),
  };

  if (!isProdEnv) {
    console.error(err);
  }
  res.status(statusCode).json(response);
  next();
};
