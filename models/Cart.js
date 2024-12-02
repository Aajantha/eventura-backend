import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  serviceName: { type: String, required: true },
  startingPrice: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Cart', CartSchema);
