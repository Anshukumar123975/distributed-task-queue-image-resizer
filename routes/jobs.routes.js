import express from 'express';
import upload from '../middleware/uploads.js';
import { uploadImage, getJobStatus } from '../controllers/jobs.controllers.js';

const router = express.Router();

router.post('/upload-image', upload.single('image'), uploadImage);
router.get('/status/:jobId', getJobStatus);

export default router;
