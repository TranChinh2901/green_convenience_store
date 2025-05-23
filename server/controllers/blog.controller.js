const blogModel = require("../models/blog.model");

const createBlogController = (req, res) => {
    try {
        const { title, content, image } = req.body;
        if (!title || !content || !image) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const blog = new blogModel({
            title,
            content,
            image
        });
        blog.save()
            .then((savedBlog) => {
                return res.status(201).json({
                    success: true,
                    message: "Blog created successfully",
                    blog: savedBlog
                })
            })
            .catch((error) => {
                return res.status(500).json({
                    success: false,
                    message: "Internal server error",
                    error: error.message
                })
            })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}
module.exports = {
    createBlogController
}