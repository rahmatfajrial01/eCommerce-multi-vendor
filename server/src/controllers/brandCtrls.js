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

const getABrand = async (req, res) => {
    const { id } = req.params
    try {
        const brand = await Brand.findById(id);
        res.json(brand)
    } catch (error) {
        throw new Error(error)
    }
}

const updateBrand = async (req, res) => {
    try {
        // console.log(req.params.id)
        // console.log(req.file.path)
        let brand = await Brand.findById(req.params.id)
        let imgId = brand.image.public_id
        const fileImage = req?.file?.path

        if (fileImage) {
            await cloudinary.uploader.destroy(imgId)
            const result = await cloudinary.uploader.upload(fileImage, {
                folder: "eCommerce"
            })
            if (result) {
                await Brand.findByIdAndUpdate(
                    req.params.id,
                    {
                        image: {
                            public_id: result.public_id,
                            url: result.secure_url
                        },
                        title: req.body.title || brand.title
                    },
                    {
                        new: true
                    }
                )
            }
        } else {
            await Brand.findByIdAndUpdate(
                req.params.id,
                {
                    title: req.body.title || brand.title
                },
                {
                    new: true
                }
            )
        }
        return res.json({ message: "Brand Image Updated" });
    } catch (error) {
        throw new Error(error)
    }
}


module.exports = {
    createBrand,
    getAllBrand,
    deleteBrand,
    getABrand,
    updateBrand
}