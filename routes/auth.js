const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthController')

router.post('/register',AuthController.register)
router.post('/login',AuthController.login)
router.post('/forgotPassword',AuthController.forgotPassword)
router.post('/resetPassword',AuthController.verifyToken,AuthController.resetPassword)
router.post('/sendOtp',AuthController.sendOtp)
router.post('/otpchangePassword',AuthController.otpchangePassword)

module.exports = router