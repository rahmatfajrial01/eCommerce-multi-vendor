const Banner = require("../models/bannerModels");
const cloudinary = require('../utils/cloudinary')
const createBanner = async (req, res, next) => {
    const { title, type, image } = req.body;

    try {
        const result = await cloudinary.uploader.upload(req.file.path)

        const newBanner = new Banner({
            title,
            type,
            image: {
                public_id: result.public_id,
                url: result.secure_url
            }
        });
        const savedBanner = await newBanner.save();


        return res.status(201).json(savedBanner);


    } catch (error) {
        next(error);
    }
};

module.exports = {
    createBanner
}