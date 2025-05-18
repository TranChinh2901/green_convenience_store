const productModel = require("../models/product.model");

const createProductController = async (req, res) => {
    try {
        const newProduct = new productModel(req.body);
        const savedProduct = await newProduct.save();
        return res.status(201).send({
            success: true,
            message: 'Tạo sản phẩm thành công',
            product: savedProduct,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Lỗi hàm createProductController',
            error: error.message,
        })
    }
}

module.exports = {
    createProductController
}