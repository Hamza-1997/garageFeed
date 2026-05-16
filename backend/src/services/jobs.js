const jobDb = require('../db/jobs');

const getAll = async () => {
  return await jobDb.getAll();
};

const create = async (data) => {
  return await jobDb.create(data);
};

module.exports = {
  getAll,
  create,
};
