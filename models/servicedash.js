import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String },
});

// Export the Event model
const EventService = mongoose.model('EventService', eventSchema);
export default EventService;
