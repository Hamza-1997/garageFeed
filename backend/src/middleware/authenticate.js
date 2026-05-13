const jwt = require('jsonwebtoken');
const config = require('../config');
const logger = require('../lib/logger');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    logger.warn({ ip: req.ip }, 'Authentication failed: No token provided');
    return res.status(401).json({ message: 'Authentication required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    logger.warn({ ip: req.ip, error: error.message }, 'Authentication failed: Invalid token');
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
