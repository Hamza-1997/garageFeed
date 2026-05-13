require('dotenv').config();
const logger = require('../lib/logger');

const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
  jwtSecret: process.env.JWT_SECRET,
  databaseUrl: process.env.DATABASE_URL,
  sentryDsn: process.env.SENTRY_DSN,
};

// Define the required environment variables for the application to run
const requiredVars = ['jwtSecret', 'databaseUrl'];

const missingVars = requiredVars.filter((varName) => !config[varName]);

if (missingVars.length > 0) {
  const errorMsg = `Missing required environment variables: ${missingVars.join(', ')}`;
  logger.fatal(errorMsg);
  throw new Error(errorMsg);
}

module.exports = config;
