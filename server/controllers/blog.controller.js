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
const getAllBlogController = async (req, res) => {
    try {
        const blogs = await blogModel.find();
        if (!blogs) {
            return res.status(404).json({
                success: false,
                message: "No blogs found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Blogs fetched successfully",
            blogs
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
const getBlogByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Blog fetched successfully",
            blog
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
const deleteBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
            blog
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
const updateBlogController = async (req, res) => {
    try {
        const { title, content, image } = req.body;
        const { id } = req.params;

        const blog = await blogModel.findById(id);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        const updatedBlog = await blogModel.findByIdAndUpdate(
            id,
            { title, content, image },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            blog: updatedBlog
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

module.exports = {
    createBlogController,
    getAllBlogController,
    getBlogByIdController,
    deleteBlogController,
    updateBlogController
}