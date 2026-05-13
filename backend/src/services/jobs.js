const jobDb = require('../db/jobs');

const getAll = async () => {
  return await jobDb.getAll();
};

module.exports = {
  getAll,
};
