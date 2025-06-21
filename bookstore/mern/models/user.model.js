import mongoose from 'mongoose'

export default mongoose.model(
  'User',
  new mongoose.Schema({
    _books: [{ type: mongoose.Types.ObjectId, ref: 'Book' }],
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  })
)
