const JWT = require('jsonwebtoken');
const userModel = require('../models/auth.model');

const requireSignIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                message: "No token provided",
                success: false
            })
        }
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error requireSignIn",
            success: false,
            error: error.message
        })
    }
}
const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        if (user.role !== 1) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error isAdmin",
            success: false,
            error: error.message
        })
    }
}

module.exports = {
    requireSignIn,
    isAdmin
}