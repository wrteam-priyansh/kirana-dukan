const express = require("express")
const router = express.Router()
const vefiryAuthencity = require("../middlewares/verifyAuthenticity")
const validateRequestBody = require("../middlewares/validateRequestBody")
const { body } = require("express-validator")

const {
    createShop, getShopDetailsById, addShopProduct
} = require("../controllers/shop")

router.get("/:shopId", vefiryAuthencity, getShopDetailsById)
router.post("/create", vefiryAuthencity, [

    //name,address,latitude,lognitude,cityId,userId
    body('name').exists().withMessage('Please enter shop name').isString().withMessage("Please enter proper shop name"),
    body('address').exists().withMessage('Please enter adress').isString().withMessage("Please enter proper address"),
    body('latitude').exists().withMessage('Please enter latitude').isNumeric().withMessage("Please enter valid latitude"),
    body('lognitude').exists().withMessage('Please enter lognitude').isNumeric().withMessage("Please enter valid lognitude"),
    body('cityId').exists().withMessage('Please enter cityId').isInt().withMessage("Please enter valid cityId"),
    body('userId').exists().withMessage('Please enter userId').isInt().withMessage("Please enter valid userId"),

], validateRequestBody, createShop)
router.post("/:shopId/products/add", vefiryAuthencity, [

    //price,productVariantId
    body('price').exists().withMessage('Please enter price').isString().withMessage("Please enter proper shop name"),
    body('productVariantId').exists().withMessage('Please enter productVariantId').isInt().withMessage("Please enter valid productVariantId"),
], validateRequestBody, addShopProduct)




module.exports = router