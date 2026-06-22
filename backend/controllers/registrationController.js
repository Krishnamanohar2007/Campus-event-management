const Registration = require('../models/Registration');
const Event = require('../models/Event');

const  registerForEvent = async (req, res) => {
    try{
        const {eventId} = req.params;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if(new Date() > event.date) {
            return res.status(400).json({ message: 'Registrations closed. Event has already completed' });
        }

        const existingRegistration = await Registration.findOne({ event: eventId, user: req.user._id });
        if (existingRegistration) {
            return res.status(400).json({ message: 'User already registered for this event' });
        }

        const registrationCount = await Registration.countDocuments({ event: eventId });
        if (registrationCount >= event.capacity) {
            return res.status(400).json({ message: 'Event is full. Cannot register' });
        }

        const registration = await Registration.create({
            student: req.user._id,
            event: eventId
        });
        
        res.status(201).json({ message: 'Registration successful', registration });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
const  getMyRegistrations = async (req, res) => {
    try{
        const registrations = await Registration.find({ student: req.user._id }).populate('event');
        res.status(200).json({ registrations });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
const getEventParticipants = async (req, res) => {
    try{
        const { eventId } = req.params;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        const isOwner = event.createdBy.toString() === req.user._id.toString();
        if (!isOwner && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }
        const participants = await Registration.find({ event: eventId }).populate('student', 'name email');
        res.status(200).json({ participants });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const unregisterFromEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        const registration = await Registration.findOne({ student: req.user._id,event: eventId });
        if (!registration) {
            return res.status(404).json({ message: 'Registration not found' });
        }
        await registration.deleteOne();
        res.status(200).json({ message: 'Unregistered from event successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerForEvent,
    getMyRegistrations,
    getEventParticipants,
    unregisterFromEvent
};