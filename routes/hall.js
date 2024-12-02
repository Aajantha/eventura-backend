// // // hall.js
// // import express from 'express';
// // import Venue from '../models/Venuehall.js'; // Ensure to include the correct file extension
// // import multer from 'multer';
// // import { CloudinaryStorage } from 'multer-storage-cloudinary';
// // import cloudinary from 'cloudinary';
// // import dotenv from 'dotenv';

// // dotenv.config(); // Load environment variables

// // // Cloudinary configuration using environment variables
// // cloudinary.config({
// //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //   api_key: process.env.CLOUDINARY_API_KEY,
// //   api_secret: process.env.CLOUDINARY_API_SECRET,
// // });

// // // Multer storage configuration for Cloudinary
// // const storage = new CloudinaryStorage({
// //   cloudinary,
// //   params: {
// //     folder: 'venues',
// //     allowed_formats: ['jpg', 'png', 'jpeg'],
// //   },
// // });

// // // Multer upload middleware
// // const upload = multer({ storage });

// // const router = express.Router();

// // // Create a new venue with photo upload
// // router.post('/add', upload.array('photos', 5), async (req, res) => {
// //   const { serviceName, description, startingPrice, priceRange, includedFeatures, contactInformation } = req.body;

// //   try {
// //     const urls = [];
// //     const files = req.files;  // Assuming Multer is handling file uploads

// //     // Upload files to Cloudinary and store URLs in `urls` array
// //     if (files && files.length > 0) {
// //       for (const file of files) {
// //         const cloudinaryUrl = file.path;  // Cloudinary URL is available as `file.path` after upload
// //         urls.push(cloudinaryUrl);  // Add Cloudinary URL to array if upload is successful
// //       }
// //     }

// //     // Create a new venue with the provided details and uploaded photo URLs
// //     const newVenue = new Venue({
// //       serviceName,
// //       description,
// //       startingPrice,
// //       priceRange,
// //       includedFeatures,
// //       contactInformation,
// //       photos: urls,  // Add the URLs of the uploaded photos
// //     });

// //     // Save the new venue to the database
// //     const savedVenue = await newVenue.save();

// //     // Respond with the saved venue
// //     res.status(201).json(savedVenue);

// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ error: 'Error creating venue with photo upload' });
// //   }
// // });


// // // Get a specific venue by ID
// // router.get('/:id', async (req, res) => {
// //   try {
// //     const venue = await Venue.findById(req.params.id);
// //     if (!venue) return res.status(404).json({ error: 'Venue not found' });
// //     res.json(venue);
// //   } catch (error) {
// //     res.status(500).json({ error: 'Error fetching venue' });
// //   }
// // });

// // // Update a venue by ID, with optional new photos
// // router.put('/:id', upload.array('photos', 5), async (req, res) => {
// //   try {
// //     const photos = req.files ? req.files.map(file => file.path) : undefined; // Add new photos if uploaded
// //     const updatedData = { ...req.body };
// //     if (photos) updatedData.photos = photos;

// //     const updatedVenue = await Venue.findByIdAndUpdate(req.params.id, updatedData, { new: true });
// //     if (!updatedVenue) return res.status(404).json({ error: 'Venue not found' });
// //     res.json(updatedVenue);
// //   } catch (error) {
// //     res.status(500).json({ error: 'Error updating venue with photos' });
// //   }
// // });

// // // Delete a venue by ID
// // router.delete('/:id', async (req, res) => {
// //   try {
// //     const deletedVenue = await Venue.findByIdAndDelete(req.params.id);
// //     if (!deletedVenue) return res.status(404).json({ error: 'Venue not found' });
// //     res.json({ message: 'Venue deleted successfully' });
// //   } catch (error) {
// //     res.status(500).json({ error: 'Error deleting venue' });
// //   }
// // });

// // export default router; // Default export


// import express from 'express';
// import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import cloudinary from 'cloudinary';
// import dotenv from 'dotenv';


// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Cloudinary storage configuration
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     allowed_formats: ['jpg', 'png', 'jpeg'],
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
//   timeout: 15000, // Increased timeout to 15 seconds for file uploads
// });

// const router = express.Router();

// // Route for uploading photos
// router.post('/upload-photo', upload.array('photos', 5), async (req, res) => {
//   try {
//     console.log('File upload started...');
    
//     const files = req.files;
    
//     if (!files || files.length === 0) {
//       console.error('No files uploaded');
//       return res.status(400).json({ error: 'No files uploaded' });
//     }

//     const photoUrls = files.map(file => file.path);
    
//     console.log('Photos uploaded successfully');
//     console.log('Uploaded photo URLs:', photoUrls);

//     res.status(201).json({
//       message: 'Photos uploaded successfully',
//       photos: photoUrls,
//     });
//   } catch (error) {
//     if (error.code === 'LIMIT_FILE_SIZE') {
//       console.error('File size exceeds the limit');
//       return res.status(400).json({ error: 'File size exceeds the limit of 5MB' });
//     }

//     if (error.message.includes('timeout')) {
//       console.error('File upload timed out');
//       return res.status(408).json({ error: 'File upload timed out' });
//     }

//     console.error('Error uploading photos:', error);
//     res.status(500).json({ error: 'Error uploading photos' });
//   }
// });

// export default router;
