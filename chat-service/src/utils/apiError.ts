export class ApiError extends Error {
  statusCode: number;
  isOperation: boolean;

  constructor(
    statusCode: number,
    message: string | undefined,
    isOperation = true,
    stack = '',
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperation = isOperation;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
