const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
    uniqueID: {
        type: String,
        required: true
    },
    scannedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Scan', scanSchema);
