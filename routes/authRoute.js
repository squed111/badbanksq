const { userVerification } = require('../middlewares/authMiddleware');
const { Signup, Login } = require('../controllers/authController')
const router = require('express').Router()
const User = require("../models/userModel");


router.post('/', userVerification)
router.post('/signup', Signup)
router.post('/login', Login)

module.exports = router
