const Room = require('../models/roomModel');
const mongoose = require('mongoose');

const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find().populate('hotel');
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createRoom = async (req, res) => {
    const { hotel, type, price, amenities, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(hotel)) {
        return res.status(400).json({ message: 'Invalid hotel ID' });
    }

    const room = new Room({
        hotel,
        type,
        price,
        amenities,
        description,
    });

    try {
        const savedRoom = await room.save();
        res.status(201).json(savedRoom);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateRoom = async (req, res) => {
    const { hotel, type, price, amenities, description } = req.body;

    if (hotel && !mongoose.Types.ObjectId.isValid(hotel)) {
        return res.status(400).json({ message: 'Invalid hotel ID' });
    }

    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {
            hotel,
            type,
            price,
            amenities,
            description,
        }, { new: true });

        if (!updatedRoom) {
            return res.status(404).json({ message: 'Room not found' });
        }

        res.status(200).json(updatedRoom);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteRoom = async (req, res) => {
    try {
        const deletedRoom = await Room.findByIdAndDelete(req.params.id);
        if (!deletedRoom) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json({ message: 'Room deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getRooms,
    createRoom,
    updateRoom,
    deleteRoom,
};