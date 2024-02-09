const mongoose = require('mongoose');

let verifModelSchema = new mongoose.Schema
    (
        {
            email: {
                type: String,
                required: true,
            },
            slug: String,
            otp: String,
            createdAt: { type: Date, expires: '2m', default: Date.now }
        }

    );

module.exports = mongoose.model('Verif', verifModelSchema);
