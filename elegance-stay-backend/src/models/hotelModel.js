const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    rooms: {
        type: Number,
        required: true,
    },
    amenities: {
        type: [String],
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['playa', 'montaña', 'ciudad', 'pueblo'],
    },
    city: {
        type: String,
        required: true,
        enum: ['San Andres', 'Bogota', 'Medellin', 'Cali', 'Cartagena'],
    },
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;