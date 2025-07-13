import { Queue } from 'bullmq';
import { connection } from '../db/redis.js';

const jobQueue = new Queue('taskQueue', { connection });

export default jobQueue;
