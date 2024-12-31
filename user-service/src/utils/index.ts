import bcrypt from 'bcryptjs';

class ApiError extends Error {
  statusCode: number;
  isOprational: boolean;

  constructor(statusCode: number, message: string | undefined, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOprational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

const encryptPassword = (password: string) => bcrypt.hash(password, 12);

const isPasswordMatch = (password: string, userPassword: string) => bcrypt.compare(password, userPassword);

export { ApiError, encryptPassword, isPasswordMatch };
