const mongoose = require('mongoose');

const shortUrlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    customName: {
        type: String,
        required: false,
    },  
    shortUrl: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
    },
    maxClicks: {
        type: Number,
        required: false,
    },
    qrcode: {
        type: String,
        required: false,
    },
    clicks: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: String,
        required: false,
    },
});
module.exports = mongoose.model('ShortUrl', shortUrlSchema);
