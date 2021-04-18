export class CustomError extends Error {
  statusCode: number;
  message: string;
  details?: unknown;

  constructor(statusCode: number, message: string, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.details = details;
  }
}
