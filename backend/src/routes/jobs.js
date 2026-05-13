const express = require('express');
const jobController = require('../controllers/jobs');

const router = express.Router();

router.get('/', jobController.getAll);

module.exports = router;
