const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const config = require('../config');

// Initialize S3 Client securely without exposing in controllers
const s3Client = new S3Client({
  region: config.aws.region,
  credentials: {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
  },
});

const generatePresignedUrl = async (fileName, fileType) => {
  const command = new PutObjectCommand({
    Bucket: config.aws.bucketName,
    Key: fileName,
    ContentType: fileType,
  });
  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
  const fileUrl = `https://${config.aws.bucketName}.s3.${config.aws.region}.amazonaws.com/${fileName}`;

  return {
    signedUrl,
    fileName
  };
};

const generateGetPresignedUrl = async (fileName) => {
  if (!fileName) return null;
  // If it's already a full URL (from legacy data), return it as is
  if (fileName.startsWith('http')) return fileName;

  const command = new GetObjectCommand({
    Bucket: config.aws.bucketName,
    Key: fileName,
  });
  
  // URL valid for 1 hour
  return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
};

module.exports = {
  generatePresignedUrl,
  generateGetPresignedUrl
};
