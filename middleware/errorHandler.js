// errorHandler.js
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    this.message = message || getReasonPhrase(this.statusCode);
  }
}

const handleError = (err, req, res, next) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

export { ErrorHandler, handleError };
