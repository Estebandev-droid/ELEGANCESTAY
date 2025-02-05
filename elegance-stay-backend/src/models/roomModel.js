const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    amenities: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;