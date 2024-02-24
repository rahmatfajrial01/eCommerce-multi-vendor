const mongoose = require('mongoose'); // Erase if already required
const { hash, compare } = require('bcryptjs')
const { sign } = require("jsonwebtoken");
const crypto = require('crypto')


const userSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: ""
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default: 1
    },
    verified: {
        type: Boolean,
        default: false
    },
    addresses: [
        {
            recipientName: {
                type: String,
            },
            province: {
                type: String,
            },
            city: {
                type: String,
            },
            city_id: {
                type: Number,
            },
            fullAddress: {
                type: String,
            },
        }
    ],
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
}, {
    timestamps: true
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await hash(this.password, 10);
        return next();
    }
    return next();
});

userSchema.methods.generateJWT = async function () {
    return await sign({
        id: this._id,
        avatar: this.avatar,
        username: this.username,
        email: this.email,
        admin: this.admin
    }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await compare(enteredPassword, this.password);
};

userSchema.methods.createPasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex")
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000
    return resetToken
}

module.exports = mongoose.model('User', userSchema);

