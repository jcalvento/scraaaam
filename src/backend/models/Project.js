import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  name: String,
  selected: Boolean,
  createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.model('Project', projectSchema);

export default Project