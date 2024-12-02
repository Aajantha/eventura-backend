// routes/contactRoutes.js
import express from 'express';
import Message from '../models/contact.js';

const router = express.Router();

// POST route to save a message
router.post('/', async (req, res) => {
  const { name, email, address, eventDate, event, comments } = req.body;

  if (!name || !email || !address || !eventDate || !event) {
    return res.status(400).json({ message: 'All required fields must be filled in.' });
  }

  const newMessage = new Message({ name, email, address, eventDate, event, comments });

  try {
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET route to get all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET route to get a single message by email
router.get('/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const message = await Message.findOne({ email });
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
