// models/Message.js
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  eventDate: { type: Date, required: true },
  event: { type: String, required: true },
  comments: { type: String }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
export default Message;
