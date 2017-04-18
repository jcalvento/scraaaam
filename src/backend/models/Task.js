import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  description: String,
  epic: { type: mongoose.Schema.Types.ObjectId, ref: 'Epic' }
});

const Task = mongoose.model('Task', taskSchema);

export default Task