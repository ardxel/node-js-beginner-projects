import { CustomError } from "ts-custom-error";
import httpCodes from "http-status-codes";

class BaseError extends CustomError {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

// bad request with status code: 400;
class BadRequestError extends BaseError {
  constructor(message: string) {
    super(message, httpCodes.BAD_REQUEST);
  }
}

class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(message, httpCodes.UNAUTHORIZED);
  }
}

const AppError = {
  baseError: BaseError,
  badRequestError: BadRequestError,
  unauthorizedError: UnauthorizedError
};

export default AppError;