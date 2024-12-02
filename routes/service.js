// const express = require('express');
// const router = express.Router();
// const Event = require('../models/Event'); // Your Event model
// const multer = require('multer'); // Assuming you are using multer for file uploads

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage });

// // Create a new event with image upload
// router.post('/', upload.single('image'), async (req, res) => {
//   const { name, description, service } = req.body;
//   const imageUrl = req.file.path; // The path of the uploaded image

//   const event = new Event({
//     name,
//     description,
//     service,
//     image: imageUrl, // Save image path in the database
//   });

//   try {
//     const savedEvent = await event.save();
//     res.status(201).json({ message: 'Event created successfully!', event: savedEvent });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// module.exports = router;


import express from 'express';
import Venue from '../models/Service.js';
const router = express.Router();



// POST route to create a new venue
router.post('/', async (req, res) => {
  try {
    // Validate incoming request data
    const { serviceName, description, startingPrice, priceRange, includedFeatures, contactInformation } = req.body;

    if (!serviceName || !description || !startingPrice || !priceRange || !includedFeatures || !contactInformation) {
      return res.status(400).json({ error: 'All fields are required' }); // Validation error
    }

    // Create a new venue instance
    const venue = new Venue(req.body); 
    
    // Save the venue to the database
    await venue.save(); 
    
    // Respond with the created venue
    res.status(201).json(venue); 
  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message }); // Handle server errors
  }
});

 // Ensure you export the router


// Get all venues
router.get('/', async (req, res) => {
  try {
    const venues = await Venue.find(); // Retrieve all venues from the database
    res.status(200).json(venues); // Respond with the list of venues
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle server errors
  }
});

// Get a venue by ID
router.get('/:id', async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id); // Find venue by ID
    if (!venue) return res.status(404).json({ error: 'Venue not found' }); // Handle not found
    res.status(200).json(venue); // Respond with the found venue
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle server errors
  }
});

// Update a venue by ID
router.put('/:id', async (req, res) => {
  try {
    const venue = await Venue.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update venue
    if (!venue) return res.status(404).json({ error: 'Venue not found' }); // Handle not found
    res.status(200).json(venue); // Respond with the updated venue
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle validation errors
  }
});

// Delete a venue by ID
router.delete('/:id', async (req, res) => {
  try {
    const venue = await Venue.findByIdAndDelete(req.params.id); // Delete venue
    if (!venue) return res.status(404).json({ error: 'Venue not found' }); // Handle not found
    res.status(204).send(); // Respond with no content status
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle server errors
  }
});

export default router;

