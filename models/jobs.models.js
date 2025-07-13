import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  jobId: String,
  status: {
    type: String,
    enum: ['queued', 'in-progress', 'completed', 'failed'],
    default: 'queued'
  },
  result: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Job = mongoose.model("Job", jobSchema);
export default Job;