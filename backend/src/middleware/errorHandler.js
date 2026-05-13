const Sentry = require('@sentry/node');
const logger = require('../lib/logger');
const config = require('../config');

const errorHandler = (err, req, res, next) => {
  // Capture the error in Sentry
  Sentry.captureException(err);

  // Log the error with Pino
  logger.error(
    {
      err,
      req: {
        method: req.method,
        url: req.url,
        body: req.body,
        params: req.params,
        query: req.query,
        user: req.user,
      },
    },
    'Unhandled Error'
  );

  const statusCode = err.statusCode || 500;

  const response = {
    message: config.env === 'production' ? 'An internal server error occurred' : err.message,
  };

  if (config.env === 'development') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
