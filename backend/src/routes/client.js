const express = require('express');
const jobController = require('../controllers/jobs');

const router = express.Router();

router.get('/jobs/:token', jobController.getClientJob);

module.exports = router;
