import Service from '../models/Service.js';

// Get all services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new service
export const createService = async (req, res) => {
  const { name, description, price, category, images } = req.body;
  try {
    const service = new Service({ name, description, price, category, images });
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a service
export const updateService = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedService = await Service.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a service
export const deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedService = await Service.findByIdAndDelete(id);
    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
