
const productModel = require("../models/product.model");
const fs = require("fs");
const slugify = require("slugify");

const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, priceGoc, category, brand, quantity, rating, status, discountPercent, isDealHot } = req.fields;
        const image = req.files?.image;
        const images = req.files?.images;

        if (!name || !description || !price || !priceGoc || !image || !images || !category || !brand || !quantity || !rating || !status || !discountPercent || !isDealHot) {
            return res.status(400).send({
                success: false,
                message: 'Thiếu thông tin',
            });
        }

        const newProduct = new productModel({
            name,
            description,
            price,
            priceGoc,
            category,
            brand,
            quantity,
            rating,
            status,
            discountPercent,
            isDealHot,
            slug: slugify(name),
        });

        // Gắn ảnh chính
        if (image) {
            newProduct.image = {
                data: fs.readFileSync(image.path),
                contentType: image.type,
            };
        }

        // Gắn nhiều ảnh phụ
        if (images) {
            if (Array.isArray(images)) {
                newProduct.images = images.map((img) => ({
                    data: fs.readFileSync(img.path),
                    contentType: img.type,
                }));
            } else {
                newProduct.images = [{
                    data: fs.readFileSync(images.path),
                    contentType: images.type,
                }];
            }
        }

        await newProduct.save();
        res.status(201).send({
            success: true,
            message: 'Thêm sản phẩm thành công',
            product: newProduct,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Lỗi hàm createProductController',
            error: error.message,
        });
    }
};
const getAllProductsController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate("category").populate("brand").select("-image -images").sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            message: 'Lấy tất cả sản phẩm thành công',
            products,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Lỗi hàm getAllProductsController',
            error: error.message,
        });
    }
}
const deleteProductController = async (req, res) => {
    try {
        const { pId } = req.params;
        const product = await productModel.findByIdAndDelete(pId);
        if (!product) {
            return res.status(404).send({
                success: false,
                message: 'Không tìm thấy sản phẩm',
            });
        }
        res.status(200).send({
            success: true,
            message: 'Xóa sản phẩm thành công',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Lỗi hàm deleteProductController',
            error: error.message,
        })
    }
}
const updateProductController = async (req, res) => {
    try {
        const { pId } = req.params;
        const { name, description, price, priceGoc, category, brand, quantity, rating, status, discountPercent, isDealHot } = req.fields;
        const image = req.files?.image;
        const images = req.files?.images;
        if (!name || !description || !price || !priceGoc || !image || !images || !category || !brand || !quantity || !rating || !status || !discountPercent || !isDealHot) {
            return res.status(400).send({
                success: false,
                message: 'Thiếu thông tin',
            });
        }
        const updatedProduct = await productModel.findByIdAndUpdate(pId, {
            name,
            description,
            price,
            priceGoc,
            category,
            brand,
            quantity,
            rating,
            status,
            discountPercent,
            isDealHot,
            slug: slugify(name),
        }, { new: true });
        // Gắn ảnh chính
        if (image) {
            updatedProduct.image = {
                data: fs.readFileSync(image.path),
                contentType: image.type,
            };
        }
        // Gắn nhiều ảnh phụ
        if (images) {
            if (Array.isArray(images)) {
                updatedProduct.images = images.map((img) => ({
                    data: fs.readFileSync(img.path),
                    contentType: img.type,
                }));
            } else {
                updatedProduct.images = [{
                    data: fs.readFileSync(images.path),
                    contentType: images.type,
                }];
            }
        }
        await updatedProduct.save();
        res.status(200).send({
            success: true,
            message: 'Cập nhật sản phẩm thành công',
            product: updatedProduct,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Lỗi hàm updateProductController',
            error: error.message,
        })
    }
}
const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error WHile Filtering Products",
            error,
        });
    }
};
const getProductByIdController = async (req, res) => {
    try {
        const { pId } = req.params;
        const product = await productModel.findById(pId).populate("category").populate("brand");
        if (!product) {
            return res.status(404).send({
                success: false,
                message: 'Không tìm thấy sản phẩm',
            });
        }
        res.status(200).send({
            success: true,
            message: 'Lấy sản phẩm thành công',
            product,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Lỗi hàm getProductByIdController',
            error: error.message,
        });
    }
}
const getProductBySlugController = async (req, res) => {
    try {
        let { slug } = req.params;

        // Loại bỏ dấu ngoặc kép nếu tồn tại (do lỗi nhập liệu hoặc format sai)
        slug = slug.replace(/^"+|"+$/g, '');

        const product = await productModel
            .findOne({ slug })
            .populate("category")
            .populate("brand");

        if (!product) {
            return res.status(404).send({
                success: false,
                message: 'Không tìm thấy sản phẩm',
            });
        }

        res.status(200).send({
            success: true,
            message: 'Lấy sản phẩm thành công',
            product,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Lỗi hàm getProductBySlugController',
            error: error.message,
        });
    }
};

const countProductController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Lỗi hàm countProductController',
            error: error.message,
        });

    }
}
//Cấu hình phân trang
const productListController = async (req, res) => {
    try {
        const perPage = 4;
        const page = parseInt(req.params.page) || 1;

        const total = await productModel.countDocuments();
        const totalPages = Math.ceil(total / perPage);

        const products = await productModel
            .find({})
            .select("-image -images")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            products,
            total,
            totalPages,
            currentPage: page,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Lỗi hàm productListController",
            error: error.message,
        });
    }
};

// const relatedProductController = async (req, res) => {
//     try {
//         const { pId, cId } = req.params
//         const products = await productModel.find({
//             category: cId,
//             _id: { $ne: pId }

//         }).select("-image -images").limit(3).populate("category").populate("brand");
//         res.status(200).send({
//             success: true,
//             products,
//         })
//     } catch (error) {
//         console.log(error);
//         res.status(400).send({
//             success: false,
//             message: "error while getting related product",
//             error,
//         })
//     }
// }
const relatedProductController = async (req, res) => {
    try {
        const { pId, cId } = req.params;
        console.log("pId:", pId, "cId:", cId);
        const { limit = 10 } = req.query; // Số lượng sản phẩm muốn lấy, mặc định là 3

        // Kiểm tra ID sản phẩm và ID danh mục có hợp lệ không
        if (!pId || !cId) {
            return res.status(400).send({
                success: false,
                message: "Thiếu thông tin ID sản phẩm hoặc ID danh mục",
            });
        }

        // Tìm sản phẩm tương tự dựa theo danh mục, loại trừ sản phẩm hiện tại
        const relatedProducts = await productModel.find({
            category: cId,
            _id: { $ne: pId } // Loại trừ sản phẩm hiện tại
        })
            .select("-image -images") // Loại bỏ dữ liệu ảnh lớn để tối ưu hiệu suất
            .limit(parseInt(limit))
            .populate("category")
            .populate("brand")
            .sort({ createdAt: -1 }); // Sắp xếp theo thời gian tạo, mới nhất lên đầu

        // Kiểm tra nếu không tìm thấy sản phẩm tương tự
        if (relatedProducts.length === 0) {
            return res.status(200).send({
                success: true,
                message: "Không có sản phẩm tương tự",
                products: [],
            });
        }

        // Trả về kết quả
        res.status(200).send({
            success: true,
            message: "Lấy sản phẩm tương tự thành công",
            count: relatedProducts.length,
            products: relatedProducts,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Lỗi khi lấy sản phẩm tương tự",
            error: error.message,
        });
    }
};
module.exports = {
    createProductController,
    getAllProductsController,
    deleteProductController,
    updateProductController,
    productFiltersController,
    getProductBySlugController,
    getProductByIdController,
    countProductController,
    productListController,
    relatedProductController
};