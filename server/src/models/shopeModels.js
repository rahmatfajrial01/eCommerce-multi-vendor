const mongoose = require('mongoose');

const shopeSchema = new mongoose.Schema({
    shopeName: {
        type: String,
        required: true,
    },
    telephone: {
        type: Number,
        required: true,
    },
    avatar: {
        type: String,
        default: ""
    },
    // codePos: {
    //     type: Number,
    //     required: true,
    // },
    addresses: {
        type: Array,
        required: true,
    },
    user: [{ type: mongoose.Schema.ObjectId, ref: "User", required: true }],
}, {
    timestamps: true
});
module.exports = mongoose.model('Shope', shopeSchema);

