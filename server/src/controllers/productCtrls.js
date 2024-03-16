const asyncHandler = require("express-async-handler");
const Product = require("../models/productModels");
const slugify = require('slugify');
const User = require("../models/userModels");
const fs = require('fs')
const cloudinary = require('../utils/cloudinary')

const createProduct = asyncHandler(async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "eCommerce/products"
        })

        const { title, description, price, category, brand, quantity, shope, tag, shopeName } = req.body;
        const newProduct = await Product.create({
            title,
            slug: slugify(req.body.title),
            description,
            price,
            category,
            brand,
            shopeName,
            quantity,
            tag,
            shope,
            images: {
                public_id: result.public_id,
                url: result.secure_url
            }
        })
        res.json(newProduct)
    } catch (error) {
        throw new Error(error);
    }
});


const getAProduct = asyncHandler(async (req, res) => {
    const { slug } = req.params;
    try {
        const findProduct = await Product.findOne({ slug: req.params.slug }).populate("shope");
        res.json(findProduct)
    } catch (error) {
        throw new Error(error);
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    try {
        let product = await Product.findById(req.params.id)
        let imgId = product.images.public_id
        await cloudinary.uploader.destroy(imgId)
        const deleteProduct = await Product.findByIdAndDelete(req.params.id)
        res.json({
            message: "product deleted",
            deleteProduct
        })
    } catch (error) {
        throw new Error(error);
    }
});

const getAllProducts = asyncHandler(async (req, res) => {
    try {
        //filtering
        const queryObj = { ...req.query };
        const excludeFields = ["page", "sort", "limit", "fields"]
        excludeFields.forEach((el) => delete queryObj[el])
        // console.log(queryObj)
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)

        let query = Product.find(JSON.parse(queryStr))

        // sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy)
        } else {
            query = query.sort("-createdAt")
        }

        //limiting the field

        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields);
        } else {
            query = query.select("-__v")
        }

        //pagination
        const page = req.query.page
        const limit = req.query.limit
        const skip = (page - 1) * limit
        query = query.skip(skip).limit(limit)
        if (req.query.page) {
            const productCount = await Product.countDocuments()
            if (skip >= productCount) throw new Error("this page does not exists")
        }

        const product = await query
        res.json(product)
        // const findAllProduct = await Product.find(queryObj);
        // res.json(findAllProduct)
    } catch (error) {
        throw new Error(error);
    }
});
const getAllProduct = asyncHandler(async (req, res) => {
    try {
        const allProduct = await Product.find({}).populate('category').populate('brand').populate('shope')
        return res.json(allProduct);
    } catch (error) {
        throw new Error(error);
    }
});
const sortProduct = asyncHandler(async (req, res) => {
    try {

        const queryObj = { price: req.query.price }
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
        let query = JSON.parse(queryStr)

        const { category, tag, brand, search, sort } = req.query

        if (search) {
            query.title = { $regex: search, $options: "i" };
        }
        if (category) {
            query.category = category
        }
        if (tag) {
            query.tag = tag
        }
        if (brand) {
            query.brand = brand
        }
        const allProduct = await Product.find(query).populate('category').populate('brand').populate('shope').sort(sort)
        return res.json(allProduct);
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
});

module.exports = {
    createProduct,
    getAProduct,
    getAllProduct,
    deleteProduct,
    sortProduct
}
