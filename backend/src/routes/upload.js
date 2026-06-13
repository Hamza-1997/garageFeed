const express = require('express');
const uploadController = require('../controllers/upload');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/presigned-url', authenticate, uploadController.getPresignedUrl);

module.exports = router;
