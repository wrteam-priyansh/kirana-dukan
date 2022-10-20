const response = require("../utils/response")
const { measurement } = require("../models")

const getAllMeasurements = async (req, res) => {
    try {
        const result = await measurement.findAll()
        if (result) {
            res.send(response.success(result))
        }
        else {

            res.send(response.error("Failed to get measurements"))
        }
    } catch (error) {
        res.send(response.error("Failed to get measurements"))
    }
}


const addMeasurement = async (req, res) => {
    try {
        const result = await measurement.create(req.body)
        if (result) {
            res.send(response.success(result))
        }
        else {

            res.send(response.error("Failed to add measurement"))
        }
    } catch (error) {
        res.send(response.error("Failed to add measurement"))
    }
}

const editMeasurement = async (req, res) => {
    try {
        const measurementId = req.params.measurementId

        if (!parseInt(measurementId)) {
            res.send(response.error("Please enter valid measurementId"))
            return;
        }
        //It will remove empny or null values 
        let updateFields = req.body
        Object.keys(req.body).forEach((value) => {
            if (updateFields[value] == "" || updateFields[value] == null) {
                delete updateFields[value]
            }
        })

        const result = await measurement.update(updateFields, {
            where: {
                id: measurementId
            },
            returning: true,
        });

        if (result) {
            const updatedResult = result[1][0];//Update return [1,[{}]]
            res.send(response.success(updatedResult))
        }
        else {
            res.send(response.error("Failed to update measurement"))
        }
    } catch (error) {
        res.send(response.error("Failed to update measurement"))
    }
}

const deleteMeasurement = async (req, res) => {
    try {
        const measurementId = req.params.measurementId

        if (!parseInt(measurementId)) {
            res.send(response.error("Please enter valid measurementId"))
            return;
        }
        await measurement.destroy({
            where: {
                id: measurementId
            },
        })

        res.send(response.success("Measurement deleted successfully"))

    } catch (error) {
        res.send(response.error("Failed to measurement category"))
    }
}



module.exports = {
    getAllMeasurements, addMeasurement, editMeasurement, deleteMeasurement
}