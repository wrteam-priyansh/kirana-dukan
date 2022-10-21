const response = require("../utils/response")
const { product, category, measurement, productVariant } = require("../models")
const { Op } = require("sequelize")

const getAllProducts = async (req, res) => {
    try {

        //measurementId, categoryId, searchKey
        let queryParameters = req.query

        //Checking the keys 
        if (queryParameters.searchKey != null || queryParameters.categoryId != null || queryParameters.measurementId != null) {
            if (queryParameters.searchKey != null) {
                const nameToSearch = queryParameters.searchKey;
                queryParameters['name'] = {
                    [Op.iLike]: `%${nameToSearch}%`
                }
                delete queryParameters.searchKey
            }
        }
        else {
            queryParameters = {}
        }

        const result = await product.findAll({
            where: queryParameters,
            include: [
                {
                    model: category,
                    attributes: ['id', 'name']
                },
                {
                    model: measurement,
                    attributes: ['id', 'name', 'code']
                }, {
                    model: productVariant,
                    as: 'variants'
                }
            ]
        },
        )

        //
        if (result) {
            res.send(response.success(result))
        }
        else {

            res.send(response.error("Failed to get products"))
        }
    } catch (error) {
        //console.log(error)
        res.send(response.error("Failed to get products"))
    }
}



const addProduct = async (req, res) => {
    try {
        const result = await product.create(req.body)
        if (result) {
            res.send(response.success(result))
        }
        else {

            res.send(response.error("Failed to add product"))
        }
    } catch (error) {
        res.send(response.error("Failed to add product"))
    }
}

const editProduct = async (req, res) => {
    try {
        const productId = req.params.productId
        if (!parseInt(productId)) {
            res.send(response.error("Please enter valid productId"))
            return;
        }
        //It will remove empny or null values 
        let updateFields = req.body
        Object.keys(req.body).forEach((value) => {
            if (updateFields[value] == "" || updateFields[value] == null) {
                delete updateFields[value]
            }
        })
        const result = await product.update(updateFields, {
            where: {
                id: productId
            },
            include: [
                {
                    model: category
                },
                {
                    model: measurement
                }, {
                    model: productVariant,
                }
            ],
            nest: true,
            returning: true,
        });

        if (result) {
            const updatedResult = result[1][0];//Update return [1,[{}]]
            res.send(response.success(updatedResult))
        }
        else {
            res.send(response.error("Failed to update product"))
        }
    } catch (error) {
        res.send(response.error("Failed to update product"))
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId

        if (!parseInt(productId)) {
            res.send(response.error("Please enter valid productId"))
            return;
        }
        await product.destroy({
            where: {
                id: productId
            },
        })

        res.send(response.success("Measurement deleted successfully"))

    } catch (error) {
        res.send(response.error("Failed to product"))
    }
}



module.exports = {
    getAllProducts, addProduct, editProduct, deleteProduct
}