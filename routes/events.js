// import express from 'express';
// import {
//     createEvent,
//     getAllEvents,
//     getEventById,
//     updateEvent,
//     deleteEvent
// } from '../controllers/eventController.js';

// const router = express.Router();

// // POST: Create a new event
// router.post('/', createEvent);

// // GET: Retrieve all events
// router.get('/', getAllEvents);

// // GET: Retrieve a single event by ID
// router.get('/:id', getEventById);

// // PUT: Update an event by ID
// router.put('/:id', updateEvent);

// // DELETE: Delete an event by ID
// router.delete('/:id', deleteEvent);

// export default router;

// const express = require('express');
// const router = express.Router();
// const Event = require('../models/event'); // Event schema connect

// // Add event route
// router.post('/addEvent', async (req, res) => {
//   const { eventName, description } = req.body;

//   try {
//     const newEvent = new Event({ eventName, description });
//     await newEvent.save();
//     res.status(201).json({ message: 'Event added successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to add event' });
//   }
// });

// module.exports = router;




// import express from 'express';
// import Event from '../models/event.js'; // Importing the Event schema

// const router = express.Router();

// // Add event route
// router.post('/addEvent', async (req, res) => {
//   const { eventName, description } = req.body; // Destructuring the request body

//   // Validate input
//   if (!eventName || !description) {
//     return res.status(400).json({ error: 'Event name and description are required' });
//   }

//   try {
//     // Create a new event instance
//     const newEvent = new Event({
//       eventName,
//       description,
//     });

//     // Save the event to the database
//     await newEvent.save();

//     // Send a success response
//     return res.status(201).json({ message: 'Event added successfully', event: newEvent });
//   } catch (error) {
//     console.error('Error adding event:', error); // Log the error for debugging
//     return res.status(500).json({ error: 'Failed to add event' });
//   }
// });

// // GET all events
// router.get('/Getevents', async (req, res) => {
//   try {
//     const events = await Event.find();
//     res.status(200).json(events); // Return the events as JSON
//   } catch (err) {
//     res.status(500).json({ message: err.message }); // Handle errors
//   }
// });

// // Export the router
// export default router;


// Import required modules
import express from 'express';
import Event from '../models/event.js'; // Importing the Event schema

const router = express.Router();

// Add event route
router.post('/addEvent', async (req, res) => {
  const { eventName, description } = req.body; // Destructuring the request body

  // Validate input
  if (!eventName || !description) {
    return res.status(400).json({ error: 'Event name and description are required' });
  }

  try {
    // Create a new event instance
    const newEvent = new Event({
      eventName,
      description,
    });

    // Save the event to the database
    await newEvent.save();

    // Send a success response
    return res.status(201).json({ message: 'Event added successfully', event: newEvent });
  } catch (error) {
    console.error('Error adding event:', error); // Log the error for debugging
    return res.status(500).json({ error: 'Failed to add event' });
  }
});

// GET all events
router.get('/Getevents', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events); // Return the events as JSON
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle errors
  }
});

// DELETE event by ID
router.delete('/deleteEvent/:id', async (req, res) => {
  const { id } = req.params; // Get the event ID from the request parameters

  try {
    const deletedEvent = await Event.findByIdAndDelete(id); // Find and delete the event

    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' }); // If no event is found
    }

    return res.status(200).json({ message: 'Event deleted successfully' }); // Send success response
  } catch (error) {
    console.error('Error deleting event:', error); // Log the error for debugging
    return res.status(500).json({ error: 'Failed to delete event' }); // Handle errors
  }
});

// Export the router
export default router;
