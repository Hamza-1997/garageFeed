require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const { S3Client, PutBucketCorsCommand } = require('@aws-sdk/client-s3');
const config = require('../src/config');

const s3Client = new S3Client({
  region: config.aws.region,
  credentials: {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
  },
});

const corsConfig = {
  Bucket: config.aws.bucketName,
  CORSConfiguration: {
    CORSRules: [
      {
        AllowedOrigins: [
          'http://localhost:3000',
          ...(config.frontendUrl ? [config.frontendUrl] : []),
        ],
        AllowedMethods: ['PUT', 'POST', 'GET'],
        AllowedHeaders: ['*'],
        ExposeHeaders: ['ETag'],
        MaxAgeSeconds: 3600,
      },
    ],
  },
};

async function main() {
  try {
    const command = new PutBucketCorsCommand(corsConfig);
    const result = await s3Client.send(command);
    console.log('S3 bucket CORS configuration applied successfully:', result.$metadata.httpStatusCode);
  } catch (error) {
    console.error('Failed to configure S3 bucket CORS:', error.message);
    process.exit(1);
  }
}

main();
