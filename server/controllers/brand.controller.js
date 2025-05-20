const brandModel = require("../models/brand.model");
const slugify = require("slugify");

const createBrandController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng nhập đầy đủ thông tin'
            })
        }
        const existingBrand = await brandModel.findOne({ name })
        if (existingBrand) {
            return res.status(400).json({
                success: false,
                message: 'Thương hiệu đã tồn tại'
            })
        }
        const newBrand = await new brandModel({ name, slug: slugify(name) }).save()
        return res.status(201).json({
            success: true,
            message: 'Tạo thương hiệu thành công',
            brand: newBrand
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Loi ham createBrandController',
            error: error.message
        })
    }
}

const getALlBrandController = async (req, res) => {
    try {
        const brands = await brandModel.find({});
        res.status(200).json({
            success: true,
            message: 'Lấy tất cả thương hiệu thành công',
            brands
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Loi ham getALlBrandController',
            error: error.message
        })
    }
}
const getBrandBySlugController = async (req, res) => {
    try {
        const { slug } = req.params;
        const brand = await brandModel.findOne({ slug })
        res.status(200).json({
            success: true,
            message: ' Lấy thương hiệu thành công',
            brand
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Loi ham getBrandByIdController',
            error: error.message
        })
    }
}
const updateBrandController = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Không có dữ liệu cập nhật'
            });
        }

        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Tên thương hiệu không được để trống'
            });
        }

        const { id } = req.params;
        const brand = await brandModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );

        if (!brand) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy thương hiệu'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Cập nhật thương hiệu thành công',
            brand
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi hàm updateBrandController',
            error: error.message
        });
    }
}
module.exports = {
    createBrandController,
    getALlBrandController,
    getBrandBySlugController,
    updateBrandController
}