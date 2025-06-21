import mongoose from 'mongoose'

export default mongoose.model(
  'Session',
  new mongoose.Schema({
    _user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    date: { type: String, required: true },
  })
)
