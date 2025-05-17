const { hashPassword, comparePassword } = require('../helpers/use.helper');
const JWT = require('jsonwebtoken');
const userModel = require('../models/auth.model');

const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, gender } = req.body;
        if (!name || !email || !password || !phone || !address || !gender) {
            return res.status(400).json({
                success: false,
                message: 'Bắt buộc phải nhập đầy đủ thông tin'
            })
        }
        const userExist = await userModel.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                success: false,
                message: 'Đã đăng ký vui lòng đăng nhập'
            })
        }
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            gender
        }).save();
        res.status(201).json({
            success: true,
            message: 'Đăng ký thành công',
            user_success: user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error in registerController",
            success: false,
            error: error.message
        })
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Bắt buộc phải nhập đầy đủ thông tin'
            })
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Tài khoản không tồn tại'
            })
        }
        const soSanh = await comparePassword(password, user.password);
        if (!soSanh) {
            return res.status(400).json({
                success: false,
                message: 'Mật khẩu không đúng'
            })
        }
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "10d" });
        res.status(200).json({
            success: true,
            message: 'Đăng nhập thành công',
            user,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi đăng nhập',
            error: error.message
        })
    }
}

const getAllUserController = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json({
            success: true,
            message: 'Lấy danh sách người dùng thành công',
            users
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi lấy danh sách người dùng',
            error: error.message
        })
    }
}

const getUserByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Không tìm thấy người dùng',
                error: error.message
            })
        }
        res.status(200).json({
            success: true,
            message: 'Lấy thông tin người dùng thành công',
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi lấy thông tin người dùng',
            error: error.message
        })
    }
}

//count
const countUser = async (req, res) => {
    try {
        const count = await userModel.countDocuments();
        res.status(200).json({
            success: true,
            message: 'Lấy số lượng người dùng thành công',
            count
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi lấy số lượng người dùng',
            error: error.message
        })
    }
}
const deleteUserController = async (req, res) => {
    try {
        const id = req.params.id;
        const xoaUser = await userModel.findByIdAndDelete(id);
        if (!xoaUser) {
            return res.status(404).json({
                message: 'Nguoi dungf ko ton tai'
            })
        }
        res.status(200).json({
            message: 'Xoas người dùng thành công'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Lỗi khi Xoa người dùng ',
            error: error.message
        })
    }
}

module.exports = {
    registerController,
    loginController,
    getAllUserController,
    getUserByIdController,
    countUser,
    deleteUserController
}