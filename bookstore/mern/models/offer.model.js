import mongoose from 'mongoose'

export default mongoose.model(
  'Offer',
  new mongoose.Schema({
    _book: { type: mongoose.Types.ObjectId, required: true, ref: 'Book' },
    _user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    salesman: { type: String, required: true, index: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true, index: true },
  })
)
