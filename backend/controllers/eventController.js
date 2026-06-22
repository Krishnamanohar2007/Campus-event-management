const Event = require('../models/Event');

const createEvent = async(req,res)=>{
    try{

        const {
            title,
            description,
            venue,
            date,
            capacity
        } = req.body;

        if(!title || !description || !venue || !date || !capacity){
            return res.status(400).json({
                message:"Please provide all required fields",
            });
        }

        const event = await Event.create({
            title,
            description,
            venue,
            date,
            capacity,
            createdBy:req.user._id
        });

        res.status(201).json(event);

    }catch(error){
        console.error(error);
        res.status(500).json({
            message:error.message,
        });
    }
};

const getEvents = async(req,res)=>{
    try{
        const events = await Event.find().populate("createdBy","name email role");  
        res.status(200).json(events);
    }catch(error){
        console.error(error);
        res.status(500).json({
            message:error.message,
        });
    }
};

const getEventById = async(req,res)=>{
    try{
        const event = await Event.findById(req.params.id).populate("createdBy","name email role");  
        if(!event){
            return res.status(404).json({
                message:"Event not found",
            });
        }
        res.status(200).json(event);
    }catch(error){
        console.error(error);
        res.status(500).json({
            message:error.message,
        });
    }
};

const updateEvent = async(req,res)=>{
    try{
        const event = await Event.findById(req.params.id);
        if(!event){
            return res.status(404).json({
                message:"Event not found",
            });
        }   

        const isOwner = event.createdBy.toString() === req.user._id.toString();
        const isAdmin = req.user.role === "admin";
        if(!isOwner && !isAdmin){
            return res.status(403).json({
                message:"You are not authorized to update this event",
            });
        }

        event.title = req.body.title ?? event.title;
        event.description = req.body.description ?? event.description;
        event.venue = req.body.venue ?? event.venue;
        event.date = req.body.date ?? event.date;
        event.capacity = req.body.capacity ?? event.capacity;

        await event.save();
        res.status(200).json(event);
    }catch(error){
        console.error(error);
        res.status(500).json({
            message:error.message,
        });
    }
};

const deleteEvent = async(req,res)=>{
    try{
        const event = await Event.findById(req.params.id);
        if(!event){
            return res.status(404).json({
                message:"Event not found",
            });
        }

        const isOwner = event.createdBy.toString() === req.user._id.toString();
        const isAdmin = req.user.role === "admin";
        if(!isOwner && !isAdmin){
            return res.status(403).json({
                message:"You are not authorized to delete this event",
            });
        }

        await event.deleteOne();
        res.status(200).json({
            message:"Event deleted successfully",
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            message:error.message,
        });
    }
};


module.exports = { createEvent, getEvents, getEventById ,updateEvent, deleteEvent};