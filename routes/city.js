const express = require("express")
const router = express.Router()
const vefiryAdminAuthencity = require("../middlewares/verifyAdminAuthenticity")
const validateRequestBody = require("../middlewares/validateRequestBody")
const { body } = require("express-validator")
const {
    getAllCities, addCity, deleteCity, updateCity
} = require("../controllers/city")


router.get("/", getAllCities)
router.post("/add", vefiryAdminAuthencity, [
    //name,latitude,lognitude
    body('name').exists().withMessage("Please enter city name").isString().withMessage("Please enter valid city name"),
    body('latitude').exists().withMessage("Please enter latitude").isNumeric().withMessage("Please enter valid latitude"),
    body('lognitude').exists().withMessage("Please enter lognitude").isNumeric().withMessage("Please enter valid lognitude"),

], validateRequestBody, addCity)
router.delete("/:cityId", vefiryAdminAuthencity, deleteCity)
router.put("/:cityId", vefiryAdminAuthencity, updateCity)


module.exports = router