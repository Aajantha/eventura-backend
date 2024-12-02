// import mongoose from 'mongoose';

// const serviceSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   }
// });

// export default mongoose.model('Service', serviceSchema);

import mongoose from 'mongoose';

const venueSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startingPrice: {
    type: Number,
    required: true,
  },
  priceRange: {
    type: String,
    required: true,
  },
  includedFeatures: {
    type: [String],
    required: true,
  },
  contactInformation: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Venue = mongoose.model('Venue', venueSchema);

export default Venue;

