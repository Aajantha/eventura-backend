// import mongoose from 'mongoose';

// const eventSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     date: {
//         type: Date,
//         required: true,
//     },
//     location: {
//         type: String,
//         required: true,
//     },
//     services: {
//         type: [String], // Array of services, e.g., ['Catering', 'Decoration']
//         required: true,
//     },
//     organizer: {
//         type: String,
//         required: true,
//     },
// }, { timestamps: true });

// export default mongoose.model('Event', eventSchema);

 import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.model('Event', eventSchema);
