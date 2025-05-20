const categoryModel = require("../models/category.model");
const slugify = require("slugify");

const createCategory = async (req, res) => {
    try {
        const { name, image, description, imageBanner, brand } = req.body;
        if (!name || !image || !description || !imageBanner || !brand) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng nhập đầy đủ thông tin"
            })
        }
        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: "Danh mục đã tồn tại"
            })
        }
        const slug = slugify(name, { lower: true });
        const newCategory = new categoryModel({
            name,
            slug,
            image,
            description,
            imageBanner,
            brand
        })
        const savedCategory = await newCategory.save();
        return res.status(201).json({
            success: true,
            message: "Tạo danh mục thành công",
            category: savedCategory
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Lỗi hàm tạo danh mục",
            error: error.message
        })
    }
}
const getAllCategory = async (req, res) => {
    try {
        const categories = await categoryModel.find({}).populate("brand");
        res.status(200).json({
            success: true,
            message: "Lấy tất cả danh mục thành công",
            categories
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Lỗi hàm lấy tất cả danh mục",
            error: error.message
        })
    }
}
const updateCategory = async (req, res) => {
    try {
        const { name, image, description, imageBanner, brand } = req.body;
        const { id } = req.params;
        const existingCategory = await categoryModel.findById(id)
        if (!existingCategory) {
            return res.status(400).json({
                success: false,
                message: "Danh mục không tồn tại"
            })
        }
        const slug = slugify(name, { lower: true });
        const updatedCategory = await categoryModel.findByIdAndUpdate(id, {
            name,
            slug,
            image,
            description,
            imageBanner,
            brand
        }, { new: true })
        if (!updatedCategory) {
            return res.status(400).json({
                success: false,
                message: "Cập nhật danh mục không thành công"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Cập nhật danh mục thành công",
            category: updatedCategory
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Lỗi hàm cập nhật danh mục",
            error: error.message
        })
    }
}
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const existingCategory = await categoryModel.findById(id)
        if (!existingCategory) {
            return res.status(400).json({
                success: false,
                message: "Danh mục không tồn tại"
            })
        }
        const deletedCategory = await categoryModel.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: "Xóa danh mục thành công",
            category: deletedCategory
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Lỗi hàm xóa danh mục",
            error: error.message
        })
    }
}
const getCategoryBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const category = await categoryModel.findOne({
            slug
        }).populate("brand");
        res.status(200).json({
            success: true,
            message: "Lấy danh mục theo slug thành công",
            category
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Lỗi hàm lấy danh mục theo slug",
            error: error.message
        })
    }
}
module.exports = {
    createCategory,
    getAllCategory,
    updateCategory,
    deleteCategory,
    getCategoryBySlug
}