require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const { S3Client, GetBucketPolicyCommand, GetBucketCorsCommand } = require('@aws-sdk/client-s3');
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
    const corsResult = await s3Client.send(new GetBucketCorsCommand({ Bucket: config.aws.bucketName }));
    console.log('Current CORS config:', JSON.stringify(corsResult.CORSRules, null, 2));
  } catch (e) {
    if (e.name === 'NoSuchCORSConfiguration') {
      console.log('No CORS configuration on bucket.');
    } else if (e.name === 'AccessDenied') {
      console.log('Access denied reading CORS config.');
    } else {
      console.log('CORS check error:', e.message);
    }
  }

  try {
    const policyResult = await s3Client.send(new GetBucketPolicyCommand({ Bucket: config.aws.bucketName }));
    console.log('Bucket policy:', JSON.parse(decodeURIComponent(policyResult.Policy)));
  } catch (e) {
    if (e.name === 'NoSuchBucketPolicy') {
      console.log('No bucket policy.');
    } else if (e.name === 'AccessDenied') {
      console.log('Access denied reading bucket policy.');
    } else {
      console.log('Policy check error:', e.message);
    }
  }
}

main();
