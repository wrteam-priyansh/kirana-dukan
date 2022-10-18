const response = require("../utils/response")
const { city } = require("../models")
const { Op } = require("sequelize");


const getAllCities = async (req, res) => {
    try {

        const cities = await city.findAll()

        if (cities) {
            res.send(response.success(cities));
        }
        else {

            res.send(response.error("Failed to fetch cities"))
        }
    } catch (error) {

        res.send(response.error("Failed to fetch cities"))
    }
}

const addCity = async (req, res) => {
    try {

        //Find city name with same name or sasme pair of lat/lng
        const matchedCities = await city.count({
            where: {
                [Op.or]: [

                    {
                        "name": {
                            [Op.iLike]: req.body.name
                        }
                    },
                    {
                        [Op.and]: [
                            { "latitude": req.body.latitude },
                            { "longitude": req.body.lognitude }
                        ]
                    }
                ],


            },
        });
        if (matchedCities != 0) {
            res.send(response.error("City already exists"))
            return;
        }

        const result = await city.create({
            "name": req.body.name,
            "latitude": req.body.latitude,
            "longitude": req.body.lognitude
        })


        if (result) {
            res.send(response.success(result))
        }
        else {
            res.send(response.error("Failed to add city"))
        }

    } catch (error) {
        console.log(error)
        res.send(response.error("Failed to add city"))
    }
}

const deleteCity = async (req, res) => {
    try {
        const cityId = req.params.cityId

        if (!parseInt(cityId)) {
            res.send(response.error("Please enter valid cityId"))
            return;
        }

        await city.destroy({
            where: {
                id: cityId
            },
        })

        res.send(response.success("City deleted successfully"))

    } catch (error) {
        res.send(response.error("Failed to delete city"))
    }
}

const updateCity = async (req, res) => {

    //Parametes name,latitude,lognitude
    try {
        const cityId = req.params.cityId

        if (!parseInt(cityId)) {
            res.send(response.error("Please enter valid cityId"))
            return;
        }

        //It will remove empny or null values 
        let updateFields = req.body
        Object.keys(req.body).forEach((value) => {
            if (updateFields[value] == "" || updateFields[value] == null) {
                delete updateFields[value]
            }
        })

        //Update return [1,[{}]]
        //Where first element is number of row affected and second will be list of objects affected 
        const result = await city.update(updateFields, {
            where: {
                id: cityId
            },
            returning: true,
        });

        if (result) {
            const updatedResult = result[1][0];//Update return [1,[{}]]
            res.send(response.success(updatedResult))
        }
        else {

            res.send(response.error("Failed to update city"))
        }

    } catch (error) {
        res.send(response.error("Failed to update city"))
    }
}


module.exports = {
    getAllCities,
    addCity,
    deleteCity,
    updateCity
}