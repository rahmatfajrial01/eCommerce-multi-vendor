const PostCategories = require("../models/productCategoryModels");
const Product = require("../models/productModels");
const asyncHandler = require('express-async-handler');

// const Post = require("../models/PostModels");


const createPostCategory = async (req, res, next) => {
    try {
        const { title } = req.body;

        const postCategory = await PostCategories.findOne({ title });

        if (postCategory) {
            const error = new Error("Category is already exist");
            return next(error);
        }

        const newPostCategory = new PostCategories({
            title,
        });

        const savedPostCategory = await newPostCategory.save();

        return res.status(201).json(savedPostCategory);
    } catch (error) {
        next(error);
    }
};

const getAllPostCategories = async (req, res, next) => {
    try {
        const postCategories = await PostCategories.find({});

        return res.json(postCategories);
    } catch (error) {
        next(error);
    }
};

const getAPostCategory = async (req, res) => {
    const { id } = req.params
    try {
        const getPostCategories = await PostCategories.findById(id);
        res.json(getPostCategories)
    } catch (error) {
        throw new Error(error)
    }
}

const updatePostCategory = async (req, res, next) => {
    try {
        const { title } = req.body;

        let postCategory = await PostCategories.findOne({ title });

        if (postCategory) {
            const error = new Error("Category is already exist");
            return next(error);
        }

        postCategory = await PostCategories.findByIdAndUpdate(
            req.params.postCategoryId,
            {
                title,
            },
            {
                new: true,
            }
        );

        if (!postCategory) {
            const error = new Error("Category was not found");
            return next(error);
        }

        return res.json(postCategory);
    } catch (error) {
        next(error);
    }
};

const deletePostCategory = asyncHandler(async (req, res, next) => {
    try {
        const categoryId = req.params.postCategoryId;

        // await Post.updateMany(
        //     { categories: { $in: [categoryId] } },
        //     { $pull: { categories: categoryId } }
        // );

        const product = await Product.find({ category: categoryId })
        if (product.length > 0) {
            throw new Error(`can't delete because (${product.length}) product use this category `);
        } else {
            await PostCategories.deleteOne({ _id: categoryId });
        }
        res.send({
            message: "Post category is successfully deleted!",
        });
    } catch (error) {
        next(error);
    }
});

module.exports = {
    createPostCategory, getAllPostCategories, updatePostCategory, deletePostCategory, getAPostCategory
}