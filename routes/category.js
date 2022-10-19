const express = require("express")
const router = express.Router()
const vefiryAdminAuthencity = require("../middlewares/verifyAdminAuthenticity")
const validateRequestBody = require("../middlewares/validateRequestBody")
const { body } = require("express-validator")
const { getCategories, getCategoryDetailsById, addCategory, editCategory, deleteCategory } = require("../controllers/category")

router.get("/", getCategories)
router.get("/:categoryId", getCategoryDetailsById)
router.post("/", vefiryAdminAuthencity, [
    body('name').exists().withMessage("Please enter category name").isString().withMessage("Please enter valid category name")
], validateRequestBody, addCategory)
router.put("/:categoryId", vefiryAdminAuthencity, editCategory)
router.delete("/:categoryId", vefiryAdminAuthencity, deleteCategory)
module.exports = router