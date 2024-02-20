const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
let productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "ProductCategories" },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
    quantity: {
        type: Number,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
    sold: {
        type: Number,
        default: 0,
    },
    images: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    shope: { type: mongoose.Schema.Types.ObjectId, ref: "Shope" },
}, { timestamps: true });

//Export the model
module.exports = mongoose.model('Product', productSchema);