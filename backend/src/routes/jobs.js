const express = require('express');
const jobController = require('../controllers/jobs');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/', authenticate, jobController.getAll);
router.post('/', authenticate, jobController.create);

module.exports = router;
