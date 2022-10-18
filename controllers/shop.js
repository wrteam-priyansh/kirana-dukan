const response = require("../utils/response")
const { shop, city, user } = require("../models")


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
                {
                    model: city,
                    as: 'city',
                },
                {
                    model: user,
                    attributes: ['id', 'name', 'email', 'phoneNumber']
                }
            ]
        });
        if (result) {
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


module.exports = {
    createShop, getShopDetailsById
}