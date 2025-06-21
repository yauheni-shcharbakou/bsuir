import mongoose from 'mongoose'

export default mongoose.model(
  'Publisher',
  new mongoose.Schema({
    name: { type: String, required: true, unique: true, index: true },
    address: { type: String, required: true },
  })
)
