import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  name: String,
  createdAt: { type: Date, default: Date.now },
  milestones: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Milestone' }]
});

const Project = mongoose.model('Project', projectSchema);

export default Project