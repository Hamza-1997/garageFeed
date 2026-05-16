const jobService = require('../services/jobs');

const getAll = async (req, res, next) => {
  try {
    const jobs = await jobService.getAll();
    res.json({ data: jobs });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { 
      projectTitle, 
      clientName, 
      clientPhone, 
      year, 
      make, 
      model, 
      workRequired, 
      status, 
      imageUrl 
    } = req.body;
    
    const workshopId = req.user.workshopId;

    if (!projectTitle || !clientName || !year || !make || !model) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newJob = await jobService.create({
      projectTitle,
      clientName,
      clientPhone,
      year,
      make,
      model,
      workRequired,
      status: status || 'WAITING',
      imageUrl,
      workshopId
    });

    res.status(201).json({ data: newJob, message: 'Job created successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  create,
};
