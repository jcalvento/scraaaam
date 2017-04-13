import mongoose from 'mongoose'

const milestoneSchema = new mongoose.Schema({
  name: String,
  selected: { type: Boolean, default: false }
});

const Milestone = mongoose.model('Milestone', milestoneSchema);

export default Milestone