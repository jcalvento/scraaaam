import mongoose from 'mongoose'

const epicSchema = new mongoose.Schema({
  name: String,
  milestone: { type: mongoose.Schema.Types.ObjectId, ref: 'Milestone' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

const Epic = mongoose.model('Epic', epicSchema);

export default Epic