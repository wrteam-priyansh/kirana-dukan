const express = require("express")
const verifyAuthenticity = require("../middlewares/verifyAuthenticity")
//const { body } = require("express-validator");
const router = express.Router()

const {
    getUserDetailsById
} = require("../controllers/user")


router.get("/:userId", verifyAuthenticity, getUserDetailsById)


module.exports = router