const Brand = require("../models/brandModels");
const cloudinary = require('../utils/cloudinary')

const createBrand = async (req, res, next) => {
    try {
        const { title } = req.body;
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "eCommerce"
        })
        const newBrand = new Brand({
            title,
            image: {
                public_id: result.public_id,
                url: result.secure_url
            }
        });
        const savedBrand = await newBrand.save();
        return res.status(201).json(savedBrand);
    } catch (error) {
        next(error);
    }
};

const getAllBrand = async (req, res, next) => {
    try {
        const allBrand = await Brand.find({})
        return res.json(allBrand);
    } catch (error) {
        next(error);
    }
};

const deleteBrand = async (req, res, next) => {
    try {
        let brand = await Brand.findById(req.params.id)
        let imgId = brand.image.public_id
        await cloudinary.uploader.destroy(imgId)
        await Brand.findByIdAndDelete(req.params.id)
        return res.json({ message: "Brand Deleted" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createBrand,
    getAllBrand,
    deleteBrand
}