const jobService = require('../services/jobs');

const getAll = async (req, res, next) => {
  try {
    const jobs = await jobService.getAll();
    res.json({ data: jobs });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const workshopId = req.user.workshopId;
    
    const job = await jobService.getById(id, workshopId);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json({ data: job });
  } catch (error) {
    next(error);
  }
};

const addUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, message, mediaUrl, costLogged, costNote, visibility } = req.body;
    const workshopId = req.user.workshopId;
    const postedById = req.user.userId;

    // Check if job exists and belongs to workshop
    const job = await jobService.getById(id, workshopId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (!title || !message) {
      return res.status(400).json({ message: 'Title and message are required' });
    }

    const newUpdate = await jobService.addUpdate(id, {
      title,
      message,
      mediaUrl,
      costLogged: costLogged ? parseFloat(costLogged) : null,
      costNote,
      visibility: visibility || 'CLIENT',
      postedById
    });

    res.status(201).json({ data: newUpdate, message: 'Update added successfully' });
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

const getClientJob = async (req, res, next) => {
  try {
    const { token } = req.params;
    
    const job = await jobService.getByClientToken(token);
    
    if (!job) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json({ data: job });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  addUpdate,
  getClientJob,
};
