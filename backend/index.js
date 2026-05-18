require('dotenv').config();
const Sentry = require('@sentry/node');
const express = require('express');
const cors = require('cors');
const logger = require('./src/lib/logger');
const config = require('./src/config');
const errorHandler = require('./src/middleware/errorHandler');
const jobsRouter = require('./src/routes/jobs');
const authRouter = require('./src/routes/auth');
const clientRouter = require('./src/routes/client');

const app = express();

Sentry.init({
  dsn: config.sentryDsn,
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  tracesSampleRate: 1.0,
});

process.on('uncaughtException', (err) => {
  logger.fatal(err, 'Uncaught Exception');
  Sentry.captureException(err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.fatal({ reason, promise }, 'Unhandled Rejection');
  Sentry.captureException(reason);
  process.exit(1);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/client', clientRouter);

// Global Error Handler Middleware
app.use(errorHandler);

const PORT = config.port || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
