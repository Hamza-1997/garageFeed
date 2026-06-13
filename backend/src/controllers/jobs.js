const jobService = require('../services/jobs');
const uploadService = require('../services/upload');

const signJobImages = async (job) => {
  if (!job) return job;
  if (job.imageUrl) {
    job.imageUrl = await uploadService.generateGetPresignedUrl(job.imageUrl);
  }
  if (job.updates && job.updates.length > 0) {
    await Promise.all(job.updates.map(async (update) => {
      if (update.mediaUrl) {
        update.mediaUrl = await uploadService.generateGetPresignedUrl(update.mediaUrl);
      }
    }));
  }
  return job;
};

const getAll = async (req, res, next) => {
  try {
    const jobs = await jobService.getAll();
    const signedJobs = await Promise.all(jobs.map(signJobImages));
    res.json({ data: signedJobs });
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
    
    const signedJob = await signJobImages(job);
    res.json({ data: signedJob });
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

    if (newUpdate.mediaUrl) {
      newUpdate.mediaUrl = await uploadService.generateGetPresignedUrl(newUpdate.mediaUrl);
    }

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

    const signedJob = await signJobImages(newJob);
    res.status(201).json({ data: signedJob, message: 'Job created successfully' });
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
    
    const signedJob = await signJobImages(job);
    res.json({ data: signedJob });
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
