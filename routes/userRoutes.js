const express = require('express')
const { Signup, Login, findOne, update } = require('../controllers/authController')
const router = express.Router()

router.post('/signup', Signup)
router.post('/login', Login)
router.get('/user/:email', findOne)
router.put('/user/:email/:balance', update)

module.exports = router 