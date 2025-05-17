const express = require('express');
const {
    registerController,
    loginController,
    getAllUserController,
    countUser,
    getUserByIdController,
    deleteUserController
} = require('../controllers/auth.controller');
const { requireSignIn, isAdmin } = require('../middlewares/middleware');
const router = express.Router();

router.post('/register', registerController)
router.post('/login', loginController)
router.get('/users', getAllUserController)
router.get('/users/:id', getUserByIdController)
router.get('/count/users', countUser)
router.delete('/users/:id', deleteUserController)

router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({
        ok: true
    })
});
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).json({ ok: true });
});

module.exports = router;