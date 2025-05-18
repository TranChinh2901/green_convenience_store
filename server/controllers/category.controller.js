const categoryModel = require("../models/category.model");

const createCategory = async (req, res) => {
    try {
        const { name, image, description } = req.body;
        if (!name || !image || !description) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng nhập đầy đủ thông tin"
            })
        }
        const existingCategory = await categoryModel.findOne({ name })
        if (!existingCategory) {
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
            description
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

module.exports = {
    createCategory
}