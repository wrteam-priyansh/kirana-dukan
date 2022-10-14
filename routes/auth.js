const express = require("express")

const { body } = require("express-validator");
const router = express.Router()

const {
    login, register
} = require("../controllers/auth")
//Login
router.post('/login', [
    body('email').exists().withMessage("Please enter email").isEmail().withMessage("Please enter valid email"),
    body('password').exists().withMessage("Please enter password").isLength({ min: 8 }).withMessage("Password must be 8 or more than 8 character"),

], login)

//Register 
router.post('/register', [
    body('email').exists().withMessage("Please enter email").isEmail().withMessage("Please enter valid email"),
    body('password').exists().withMessage("Please enter password").isLength({ min: 8 }).withMessage("Password must be 8 or more than 8 character"),
    body('name').exists().withMessage("Please enter name"),
    body('roleId').exists().withMessage("Please enter role").isInt().withMessage("Please enter valid roleId"),
    body('phoneNumber').exists().withMessage("Please enter phone number"),
], register)




module.exports = router
