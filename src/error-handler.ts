import { StatusCodes } from 'http-status-codes';

export interface IError {
  message: string;
  statusCode: number;
  status: string;
  comingFrom: string;
}

export interface IErrorResponse extends IError {
  serializeErrors(): IError;
}

export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract status: string;
  comingFrom: string;

  constructor(message: string, comingFrom: string) {
    super(message);
    this.comingFrom = comingFrom;
  }

  serializeErrors(): IError {
    return {
      message: this.message,
      statusCode: this.statusCode,
      status: this.status,
      comingFrom: this.comingFrom,
    };
  }
}

export class BadRequestError extends CustomError {
  statusCode: number = StatusCodes.BAD_REQUEST;
  status: string = 'error';

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class NotFoundError extends CustomError {
  statusCode: number = StatusCodes.NOT_FOUND;
  status: string = 'error';

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class NotAuthorizedError extends CustomError {
  statusCode: number = StatusCodes.UNAUTHORIZED;
  status: string = 'error';

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class FileTooLargeError extends CustomError {
  statusCode: number = StatusCodes.REQUEST_TOO_LONG;
  status: string = 'error';

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class ServerError extends CustomError {
  statusCode: number = StatusCodes.SERVICE_UNAVAILABLE;
  status: string = 'error';

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export interface ErrnoException extends Error {
  errno?: number;
  code?: string;
  path?: string;
  syscall?: string;
  stack?: string;
}
