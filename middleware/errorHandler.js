import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { CONSTANTS } from '../config/constants.js';

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
    status: CONSTANTS.ERROR,
    statusCode,
    message,
  });
};

export { ErrorHandler, handleError };
