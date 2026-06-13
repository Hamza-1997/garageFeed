const crypto = require('crypto');
const uploadService = require('../services/upload');

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const getPresignedUrl = async (req, res, next) => {
  try {
    const { fileType } = req.query;

    if (!fileType) {
      return res.status(400).json({ message: 'fileType query param is required' });
    }

    if (!ALLOWED_MIME_TYPES.includes(fileType)) {
      return res.status(400).json({ message: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' });
    }

    const fileExtension = fileType.split('/')[1] || 'jpeg';
    const userId = req.user.userId;
    // Secure file path: uploads/userId/uuid.extension
    const fileName = `uploads/${userId}/${crypto.randomUUID()}.${fileExtension}`;

    const { signedUrl } = await uploadService.generatePresignedUrl(fileName, fileType);

    res.json({
      data: {
        signedUrl,
        fileName
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPresignedUrl
};
