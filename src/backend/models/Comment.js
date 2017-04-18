import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  body: String,
  submitted_at: { type: Date, default: Date.now },
  epic: { type: mongoose.Schema.Types.ObjectId, ref: 'Epic' }
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment