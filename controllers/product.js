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
                    as: 'variants',
                    attributes: ['measurementValue']
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

const getProductDetailsById = async (req, res) => {
    try {
        const productId = req.params.productId;
        if (!parseInt(productId)) {
            res.send(response.error("Please enter valid productId"))
            return;
        }
        const result = await product.findOne({
            where: {
                id: productId
            },
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
                    as: 'variants',
                    attributes: ['measurementValue']
                }
            ]
        })

        if (result) {
            res.send(response.success(result))
        }
        else {

            res.send(response.error("Failed to get product details"))
        }


    } catch (error) {

        res.send(response.error("Failed to get product details"))
    }
}

const getProductVariants = async (req, res) => {
    try {
        const productId = req.params.productId;
        if (!parseInt(productId)) {
            res.send(response.error("Please enter valid productId"))
            return;
        }
        const result = await productVariant.findAll({
            where: {
                'productId': productId
            },
            attributes: ['measurementValue']
        })

        if (result) {
            res.send(response.success(result))
        }
        else {
            res.send(response.error("Failed to get product variants"))
        }


    } catch (error) {

        res.send(response.error("Failed to get product details"))
    }
}

const addProductVariant = async (req, res) => {
    try {
        const productId = req.params.productId;
        if (!parseInt(productId)) {
            res.send(response.error("Please enter valid productId"))
            return;
        }
        const result = await productVariant.create({
            'measurementValue': req.body.measurementValue,
            'productId': productId
        })

        if (result) {
            res.send(response.success(result))
        }
        else {
            res.send(response.error("Failed to add product variant"))
        }
    } catch (error) {
        res.send(response.error("Failed to add product variant"))
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

const editProductVariant = async (req, res) => {
    try {
        const productId = req.params.productId
        if (!parseInt(productId)) {
            res.send(response.error("Please enter valid productId"))
            return;
        }
        const variantId = req.params.variantId
        if (!parseInt(variantId)) {
            res.send(response.error("Please enter valid variantId"))
            return;
        }

        //It will remove empny or null values 
        let updateFields = req.body
        Object.keys(req.body).forEach((value) => {
            if (updateFields[value] == "" || updateFields[value] == null) {
                delete updateFields[value]
            }
        })

        console.log(updateFields)

        //measurementValue
        const result = await productVariant.update(updateFields, {
            where: {
                'productId': productId,
                'id': variantId
            },
            returning: true,
        });

        if (result) {

            const updatedResult = result[1][0];//Update return [1,[{}]]
            res.send(response.success(updatedResult))
        }
        else {
            res.send(response.error("Failed to update product variant"))
        }
    } catch (error) {
        res.send(response.error("Failed to update product variant"))
    }
}

const deleteProductVariant = async (req, res) => {
    try {
        const productId = req.params.productId

        if (!parseInt(productId)) {
            res.send(response.error("Please enter valid productId"))
            return;
        }
        const variantId = req.params.variantId
        if (!parseInt(variantId)) {
            res.send(response.error("Please enter valid variantId"))
            return;
        }

        await productVariant.destroy({
            where: {
                'id': variantId,
                'productId': productId
            },
        })

        res.send(response.success("Product variant deleted successfully"))

    } catch (error) {
        res.send(response.error("Failed to delete product variant"))
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

        res.send(response.success("Product deleted successfully"))

    } catch (error) {
        res.send(response.error("Failed to product"))
    }
}



module.exports = {
    getAllProducts, addProduct, editProduct, deleteProduct, getProductDetailsById, getProductVariants,
    addProductVariant, editProductVariant, deleteProductVariant
}