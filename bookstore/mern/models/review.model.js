import mongoose from 'mongoose'

export default mongoose.model(
  'Review',
  new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: String, required: true },
  })
)
