import Event from '../models/event.js';

// Create a new event
export const createEvent = async (req, res) => {
    const { name, date, location, services, organizer } = req.body;

    try {
        const event = new Event({ name, date, location, services, organizer });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all events
export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single event by ID
export const getEventById = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findById(id);
        if (!event) return res.status(404).json({ message: "Event not found" });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an event by ID
export const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { name, date, location, services, organizer } = req.body;

    try {
        const updatedEvent = await Event.findByIdAndUpdate(id, { name, date, location, services, organizer }, { new: true });
        if (!updatedEvent) return res.status(404).json({ message: "Event not found" });
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an event by ID
export const deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEvent = await Event.findByIdAndDelete(id);
        if (!deletedEvent) return res.status(404).json({ message: "Event not found" });
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
