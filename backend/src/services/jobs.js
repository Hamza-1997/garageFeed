const jobDb = require('../db/jobs');

const getAll = async () => {
  return await jobDb.getAll();
};

const create = async (data) => {
  return await jobDb.create(data);
};

const getById = async (id, workshopId) => {
  return await jobDb.getById(id, workshopId);
};

const getByClientToken = async (clientToken) => {
  return await jobDb.getByClientToken(clientToken);
};

const addUpdate = async (jobId, data) => {
  return await jobDb.addUpdate(jobId, data);
};

module.exports = {
  getAll,
  create,
  getById,
  getByClientToken,
  addUpdate,
};
