require('dotenv').config();
const logger = require('../lib/logger');

const isProduction = process.env.NODE_ENV === 'production';

const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
  jwtSecret: process.env.JWT_SECRET,
  databaseUrl: isProduction ? process.env.DATABASE_URL_PROD : process.env.DATABASE_URL,
  frontendUrl: process.env.FRONTEND_URL,
  sentryDsn: process.env.SENTRY_DSN,
  aws: {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucketName: process.env.AWS_S3_BUCKET_NAME,
  }
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
