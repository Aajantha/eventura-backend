import express from 'express';
import Service from '../models/Service.js'; // Import model

const router = express.Router();

// Add Service
router.post('/add', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const newService = new Service({ name, description, price });
    await newService.save();
    return res.status(201).json({ message: 'Service added successfully', service: newService });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Get All Services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    return res.status(200).json(services);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
