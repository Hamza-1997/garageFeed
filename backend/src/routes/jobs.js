const express = require('express');
const jobController = require('../controllers/jobs');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/', authenticate, jobController.getAll);

module.exports = router;
