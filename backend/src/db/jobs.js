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

const getById = async (id, workshopId) => {
  return await prisma.job.findFirst({
    where: { id, workshopId },
    include: {
      updates: {
        orderBy: { createdAt: 'desc' },
        include: { postedBy: true }
      }
    }
  });
};

const getByClientToken = async (clientToken) => {
  return await prisma.job.findUnique({
    where: { clientToken },
    include: {
      workshop: {
        select: {
          name: true,
        }
      },
      updates: {
        where: { visibility: 'CLIENT' },
        orderBy: { createdAt: 'desc' },
        include: {
          postedBy: {
            select: { name: true, role: true }
          }
        }
      }
    }
  });
};

const addUpdate = async (jobId, data) => {
  return await prisma.update.create({
    data: {
      jobId,
      ...data
    }
  });
};

module.exports = {
  getAll,
  create,
  getById,
  getByClientToken,
  addUpdate,
};
