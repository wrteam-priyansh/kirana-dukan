const express = require("express")
const router = express.Router()
const vefiryAdminAuthencity = require("../middlewares/verifyAdminAuthenticity")
const validateRequestBody = require("../middlewares/validateRequestBody")
const { body } = require("express-validator")
const {
    getAllMeasurements, addMeasurement, editMeasurement, deleteMeasurement
} = require("../controllers/measurement")



router.get("/", getAllMeasurements)
router.post("/add", vefiryAdminAuthencity, [
    body('name').exists().withMessage('Please enter name').isString().withMessage('Please enter valid name'),
    body('code').exists().withMessage('Please enter code')
], validateRequestBody, addMeasurement)
router.put("/:measurementId", vefiryAdminAuthencity, editMeasurement)
router.delete("/:measurementId", vefiryAdminAuthencity, deleteMeasurement)


module.exports = router