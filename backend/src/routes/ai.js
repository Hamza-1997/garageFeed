const express = require('express');
const multer = require('multer');
const aiController = require('../controllers/ai');
const authenticate = require('../middleware/authenticate');

const router = express.Router();
const upload = multer({ dest: 'uploads/temp_audio/' }); 

router.post('/transcribe', authenticate, upload.single('audio'), aiController.transcribeAudio);

module.exports = router;
