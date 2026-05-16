const prisma = require('../lib/prisma');

const getAll = async () => {
  return await prisma.job.findMany({
    orderBy: { createdAt: 'desc' }
  });
};

const create = async (data) => {
  return await prisma.job.create({
    data
  });
};

module.exports = {
  getAll,
  create,
};
