import { Worker } from 'bullmq';
import mongoose from 'mongoose';
import sharp from 'sharp';
import path from 'path';
import Job from '../models/jobs.models.js';
import { connection } from '../db/redis.js';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect("mongodb://localhost:27017/job-queue")
  .then(() => console.log('Worker connected to MongoDB'))
  .catch(err => console.error('Worker DB error:', err));

const worker = new Worker('taskQueue', async job => {
  try {
    if (job.name === 'resizeImage') {
      const inputPath = job.data.imagePath;
      const outputFileName = `resized_${Date.now()}.jpg`;
      const outputPath = path.resolve('resized', outputFileName);

      await Job.updateOne({ jobId: job.id }, { status: 'in-progress' });

      await sharp(inputPath)
        .resize(300, 300)
        .toFile(outputPath);

      await Job.updateOne({ jobId: job.id }, {
        status: 'completed',
        result: `Image saved as ${outputFileName}`
      });

      console.log(`Job ${job.id} completed: ${outputFileName}`);
    }
  } catch (err) {
    console.error(`Job ${job.id} failed`, err);
    await Job.updateOne({ jobId: job.id }, {
      status: 'failed',
      result: err.message
    });
  }
}, { connection });
