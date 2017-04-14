import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  name: String,
  selected: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  milestones: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Milestone' }]
});

projectSchema.methods.select = function() {
  this.selected = true
};

const Project = mongoose.model('Project', projectSchema);

export default Project