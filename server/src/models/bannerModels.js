const mongoose = require('mongoose');

const Banner = new mongoose.Schema
    (
        {
            title: { type: String, required: true },
            type: { type: String, required: true },
            image: {
                public_id: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                }
            }
        },
        { timestamps: true }
    );

module.exports = mongoose.model('Banner', Banner);
