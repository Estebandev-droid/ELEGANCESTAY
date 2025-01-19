const Hotel = require('../models/hotelModel');
const multer = require('multer');
const path = require('path');

// Configuración de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

const getHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createHotel = async (req, res) => {
    const { name, location, rooms, amenities, descripcion, price } = req.body;
    const image = req.file ? req.file.path : null;

    if (!image) {
        return res.status(400).json({ message: 'Image is required' });
    }

    const hotel = new Hotel({
        name,
        location,
        rooms,
        amenities,
        descripcion,
        price, 
        image,
    });

    try {
        const savedHotel = await hotel.save();
        res.status(201).json(savedHotel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateHotel = async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedHotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.status(200).json(updatedHotel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteHotel = async (req, res) => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!deletedHotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.status(200).json({ message: 'Hotel deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getHotels,
    createHotel,
    updateHotel,
    deleteHotel,
    upload,
};