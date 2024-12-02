import express from 'express';
const router = express.Router();
import EventService from '../models/servicedash.js'; 

// POST: Create new event
router.post('/', async (req, res) => {
  const { eventName, date, location, description } = req.body;

  // Validate the request body
  if (!eventName || !date || !location) {
    return res.status(400).json({ message: 'Event name, date, and location are required.' });
  }

  try {
    const newEvent = new EventService({ eventName, date, location, description });
    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
});

// GET: Fetch all events
router.get('/', async (req, res) => {
  try {
    const events = await EventService.find();  
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
});

// GET: Fetch single event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await EventService.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ message: 'Error fetching event', error: error.message });
  }
});

// PUT: Update an event by ID
router.put('/:id', async (req, res) => {
  const { eventName, date, location, description } = req.body;

  try {
    const updatedEvent = await EventService.findByIdAndUpdate(
      req.params.id,
      { eventName, date, location, description },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Error updating event', error: error.message });
  }
});

// DELETE: Delete an event by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedEvent = await EventService.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Error deleting event', error: error.message });
  }
});

// Exporting the router
export default router;
