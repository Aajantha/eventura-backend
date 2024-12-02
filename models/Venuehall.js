// models/Venue.js
import mongoose from 'mongoose';

const venueSchema = new mongoose.Schema({
  serviceName: { type: String, required: true },
  description: { type: String, required: true },
  startingPrice: { type: Number, required: true },
  priceRange: { type: String },
  includedFeatures: { type: [String], required: true },
  contactInformation: { type: String, required: true },
  photos: { type: [String], required: true } // URLs for photos
});

// Check if the model already exists, if not, create it
const Venue = mongoose.models.Venue || mongoose.model('Hall', venueSchema);

export default Hall;
