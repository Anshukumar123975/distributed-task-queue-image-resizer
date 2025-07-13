import jobQueue from '../controllers/queue.controllers.js';
import Job from '../models/jobs.models.js';

export const uploadImage = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const imagePath = req.file.path;

  const job = await jobQueue.add('resizeImage', { imagePath });
  await Job.create({ jobId: job.id, status: 'queued' });

  res.status(200).json({ message: 'Image uploaded', jobId: job.id });
};

export const getJobStatus = async (req, res) => {
  const job = await Job.findOne({ jobId: req.params.jobId });
  if (!job) return res.status(404).json({ error: 'Job not found' });

  res.status(200).json({
    jobId: job.jobId,
    status: job.status,
    result: job.result
  });
};
