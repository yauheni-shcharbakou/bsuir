import mongoose from 'mongoose'

export default mongoose.model(
  'Order',
  new mongoose.Schema({
    _book: { type: mongoose.Types.ObjectId, required: true, ref: 'Book' },
    _payment: { type: mongoose.Types.ObjectId, required: true, ref: 'Payment' },
    _offer: { type: mongoose.Types.ObjectId, required: true, ref: 'Offer' },
    _customer: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
      index: true,
    },
    _salesman: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
      index: true,
    },
    amount: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    date: { type: String, required: true },
  })
)
