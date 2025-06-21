import mongoose from 'mongoose'

export default mongoose.model(
  'Book',
  new mongoose.Schema({
    _author: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Author',
    },
    _publisher: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Publisher',
    },
    _category: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
    _reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Review',
      },
    ],
    name: { type: String, required: true },
  })
)
