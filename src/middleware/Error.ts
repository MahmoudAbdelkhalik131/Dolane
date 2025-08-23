import { Request, Response, NextFunction } from "express";
class ErrorHandler {
  public status: number;
  public message: string;
  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
    (err: any, req: Request, res: Response, next: NextFunction) => {
      res.status(this.status).json({
        success: false,
        error: this.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
      });
    };
  }
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({
    success: false,
    error: message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
export default ErrorHandler;
