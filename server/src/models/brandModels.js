const mongoose = require('mongoose');

const Brand = new mongoose.Schema
    (
        {
            title: { type: String, required: true },
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

module.exports = mongoose.model('Brand', Brand);
