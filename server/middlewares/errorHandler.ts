import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ServerError } from '../types';

/**
 * Global error handler middleware for catching and processing errors
 * This middleware should be used at the end of all routes
 */
export const errorHandler: ErrorRequestHandler = (
  err: Error | ServerError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Set default status code and error message
  let statusCode = 500;
  let errorMessage = 'Internal Server Error';
  let errorDetails = {};

  console.error('Error caught by error handler middleware:', err);

  // Check if this is a known ServerError type
  if ('status' in err && 'message' in err && 'log' in err) {
    const serverError = err as ServerError;
    statusCode = serverError.status;
    errorMessage =
      typeof serverError.message === 'string'
        ? serverError.message
        : serverError.message.err || errorMessage;

    // Include additional error details if available
    if (typeof serverError.message === 'object') {
      errorDetails = serverError.message;
    }

    console.error(`ServerError: ${serverError.log}`);
  } else {
    // For unknown errors, include the error message and stack in dev environments
    if (process.env.NODE_ENV !== 'production') {
      errorDetails = {
        message: err.message,
        stack: err.stack,
      };
    }
  }

  // Send the response but don't return it
  res.status(statusCode).json({
    success: false,
    error: errorMessage,
    ...(Object.keys(errorDetails).length > 0 && { details: errorDetails }),
  });
};
