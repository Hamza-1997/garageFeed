const express = require('express');
const jobController = require('../controllers/jobs');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/', authenticate, jobController.getAll);
router.post('/', authenticate, jobController.create);
router.get('/:id', authenticate, jobController.getOne);
router.post('/:id/updates', authenticate, jobController.addUpdate);

module.exports = router;
