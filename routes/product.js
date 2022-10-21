const express = require("express")
const router = express.Router()
const vefiryAdminAuthencity = require("../middlewares/verifyAdminAuthenticity")
const validateRequestBody = require("../middlewares/validateRequestBody")
const { body } = require("express-validator")

const {
    getAllProducts, addProduct, editProduct, deleteProduct, getProductDetailsById, getProductVariants, addProductVariant, editProductVariant, deleteProductVariant
} = require("../controllers/product")
const verifyAdminAuthenticity = require("../middlewares/verifyAdminAuthenticity")

router.get("/", getAllProducts)
router.get("/:productId", getProductDetailsById)
router.post("/add", vefiryAdminAuthencity, [
    body('name').exists().withMessage('Please enter name').isString().withMessage('Please enter valid name'),
    body('categoryId').exists().withMessage('Please enter categoryId').isInt().withMessage('Please enter valid categoryId'),
    body('measurementId').exists().withMessage('Please enter measurementId').isInt().withMessage('Please enter valid measurementId')

], validateRequestBody, addProduct)
router.put("/:productId", vefiryAdminAuthencity, editProduct)
router.delete("/:productId", vefiryAdminAuthencity, deleteProduct)

router.get("/:productId/variants", getProductVariants)
router.post("/:productId/variants/add", verifyAdminAuthenticity, [
    body('measurementValue').exists().withMessage('Please enter measurement value')
], validateRequestBody, addProductVariant)
router.put("/:productId/variants/:variantId", verifyAdminAuthenticity, editProductVariant)
router.delete("/:productId/variants/:variantId", verifyAdminAuthenticity, deleteProductVariant)


module.exports = router