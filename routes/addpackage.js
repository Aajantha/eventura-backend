import express from 'express';
import Package from '../models/package.js';
import Service from '../models/Service.js';

const router = express.Router();

// Add Package
router.post('/add', async (req, res) => {
  try {
    const { name, services, price } = req.body;
    const newPackage = new Package({ name, services, price });
    await newPackage.save();
    return res.status(201).json({ message: 'Package added successfully', package: newPackage });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Get All Packages
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find().populate('services');
    return res.status(200).json(packages);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
