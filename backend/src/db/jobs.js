const prisma = require('../lib/prisma');

const getAll = async () => {
  return await prisma.job.findMany();
};

module.exports = {
  getAll,
};
