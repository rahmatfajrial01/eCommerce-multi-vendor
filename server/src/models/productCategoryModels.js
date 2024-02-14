const mongoose = require('mongoose');

const ProductCategorySchema = new mongoose.Schema
    (
        {
            title: { type: String, required: true },
        },
        { timestamps: true }
    );

module.exports = mongoose.model('ProductCategories', ProductCategorySchema);
