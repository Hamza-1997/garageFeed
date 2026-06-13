require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const { S3Client, GetBucketCorsCommand } = require('@aws-sdk/client-s3');
const config = require('../src/config');

const s3Client = new S3Client({
  region: config.aws.region,
  credentials: {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
  },
});

async function main() {
  try {
    const command = new GetBucketCorsCommand({ Bucket: config.aws.bucketName });
    const result = await s3Client.send(command);
    console.log('Current CORS configuration:', JSON.stringify(result.CORSRules, null, 2));
  } catch (error) {
    if (error.name === 'NoSuchCORSConfiguration') {
      console.log('No CORS configuration found on the bucket. CORS needs to be configured.');
    } else if (error.name === 'AccessDenied') {
      console.log('Access denied when reading CORS config. The IAM user lacks s3:GetBucketCORS permission.');
    } else {
      console.error('Error:', error.message);
    }
  }
}

main();
