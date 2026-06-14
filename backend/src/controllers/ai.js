const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const transcribeAudio = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No audio file provided.' });
    }

    // Rename file to include the correct extension so OpenAI SDK recognizes it
    const ext = path.extname(req.file.originalname) || '.webm';
    const newPath = req.file.path + ext;
    fs.renameSync(req.file.path, newPath);

    // For the translation feature use 'whisper-large-v3' & translations instead of transcriptions
    // But for now we are using 'whisper-large-v3-turbo' & transcriptions
    const transcription = await groq.audio.transcriptions.create({
      file: fs.createReadStream(newPath),
      model: "whisper-large-v3-turbo", 
      response_format: "json",
      language: "en",
    });

    // Clean up the temporary local file
    try {
      fs.unlinkSync(newPath);
    } catch (cleanupError) {
      console.error('Error cleaning up temp audio file:', cleanupError);
    }

    res.json({ text: transcription.text });
  } catch (error) {
    // Clean up file in case of error
    // Check both paths just in case
    const pathsToClean = req.file ? [req.file.path, req.file.path + (path.extname(req.file.originalname) || '.webm')] : [];
    for (const p of pathsToClean) {
      if (fs.existsSync(p)) {
        try {
          fs.unlinkSync(p);
        } catch (cleanupError) {
          console.error('Error cleaning up temp audio file:', cleanupError);
        }
      }
    }
    next(error);
  }
};

module.exports = { transcribeAudio };
