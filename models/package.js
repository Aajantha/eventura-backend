import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  }],
  price: {
    type: Number,
    required: true,
  }
});

export default mongoose.model('Package', packageSchema);
