const express = require("express")
const router = express.Router()
const vefiryAdminAuthencity = require("../middlewares/verifyAdminAuthenticity")
const validateRequestBody = require("../middlewares/validateRequestBody")
const { body } = require("express-validator")

const {
    getAllProducts, addProduct, editProduct, deleteProduct
} = require("../controllers/product")

router.get("/", getAllProducts)

router.post("/add", vefiryAdminAuthencity, [
    body('name').exists().withMessage('Please enter name').isString().withMessage('Please enter valid name'),
    body('categoryId').exists().withMessage('Please enter categoryId').isInt().withMessage('Please enter valid categoryId'),
    body('measurementId').exists().withMessage('Please enter measurementId').isInt().withMessage('Please enter valid measurementId')

], validateRequestBody, addProduct)
router.put("/:productId", vefiryAdminAuthencity, editProduct)
router.delete("/:productId", vefiryAdminAuthencity, deleteProduct)


module.exports = router