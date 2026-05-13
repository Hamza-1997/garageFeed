const jobService = require('../services/jobs');

const getAll = async (req, res, next) => {
  try {
    const jobs = await jobService.getAll();
    res.json({ data: jobs });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
};
