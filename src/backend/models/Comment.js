import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  name: String,
  author: String,
  body: String,
  epic: { type: mongoose.Schema.Types.ObjectId, ref: 'Epic' }
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment