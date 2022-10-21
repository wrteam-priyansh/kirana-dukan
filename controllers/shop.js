const response = require("../utils/response")
const { shop, city, user, shopProduct, productVariant, product } = require("../models")



const createShop = async (req, res) => {
    try {

        const result = await shop.create(req.body)
        if (result) {
            res.send(response.success(result))
        }
        else {
            res.send(response.error("Failed to create shop"))
        }
    } catch (error) {
        res.send(response.error("Failed to create shop"))
    }
}

const getShopDetailsById = async (req, res) => {

    try {

        const shopId = req.params.shopId

        if (!parseInt(shopId)) {
            res.send(response.error("Please enter valid shopId"))
            return;
        }

        const result = await shop.findOne({
            where: {
                id: shopId
            },

            include: [
                // {
                //     model: city,
                //     as: 'city',
                // },
                // {
                //     model: user,0......000
                //     attributes: ['id', 'name', 'email', 'phoneNumber']
                // },
                {
                    model: productVariant,
                    through: shopProduct,
                    include: [{ model: product }],
                    as: 'products'
                }
            ],
        });
        if (result) {
            result.seller = result.user
            delete result.user
            res.send(response.success(result))
        }
        else {

            res.send(response.error("Failed to get shop details"))
        }
    } catch (error) {
        console.log(error)


        res.send(response.error("Failed to get shop details"))
    }
}

const addShopProduct = async (req, res) => {
    try {

        //Check : authencity
        const shopId = req.params.shopId;
        if (!parseInt(shopId)) {

            res.send(response.error("Please enter valid shopId"))
            return;
        }

        const { price, productVariantId } = req.body

        const result = await shopProduct.create({
            'price': price,
            'productVariantId': productVariantId,
            'shopId': shopId,
        });
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

module.exports = {
    createShop, getShopDetailsById, addShopProduct
}