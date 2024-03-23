const Banner = require("../models/bannerModels");
const cloudinary = require('../utils/cloudinary')

const createBanner = async (req, res, next) => {
    try {
        const { title, type } = req.body;
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "eCommerce"
        })
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

const getAllBanner = async (req, res, next) => {
    try {
        const allBanner = await Banner.find({})
        return res.json(allBanner);
    } catch (error) {
        next(error);
    }
};

const deleteBanner = async (req, res, next) => {
    try {
        let banner = await Banner.findById(req.params.id)
        let imgId = banner.image.public_id
        await cloudinary.uploader.destroy(imgId)
        await Banner.findByIdAndDelete(req.params.id)
        return res.json({ message: "Banner Deleted" });
    } catch (error) {
        next(error);
    }
};

const getABanner = async (req, res) => {
    const { id } = req.params
    try {
        const banner = await Banner.findById(id);
        res.json(banner)
    } catch (error) {
        throw new Error(error)
    }
}

const updateImageBanner = async (req, res) => {
    try {
        // console.log(req.params.id)
        // console.log(req.file.path)
        let banner = await Banner.findById(req.params.id)
        let imgId = banner.image.public_id
        if (req?.file?.path) {
            await cloudinary.uploader.destroy(imgId)
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "eCommerce"
            })
            if (result)
                await Banner.findByIdAndUpdate(
                    req.params.id,
                    {
                        image: {
                            public_id: result.public_id,
                            url: result.secure_url
                        },
                        title: req.body.title || banner.title,
                        type: req.body.type || banner.type
                    },
                    {
                        new: true
                    }
                )
        } else {
            await Banner.findByIdAndUpdate(
                req.params.id,
                {
                    title: req.body.title || banner.title,
                    type: req.body.type || banner.type
                },
                {
                    new: true
                }
            )
        }

        return res.json({ message: "Banner Image Updated" });
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    createBanner,
    getAllBanner,
    deleteBanner,
    getABanner,
    updateImageBanner
}