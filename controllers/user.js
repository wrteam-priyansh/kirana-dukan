const response = require("../utils/response")
const { user, shop } = require("../models")

const getUserDetailsById = async (req, res) => {

    const userId = req.params.userId

    if (!parseInt(userId)) {
        res.send(response.error("Please enter valid userId"))
        return;
    }
    if (userId != req.userId) {
        res.send(response.accessDenied())
        return;
    }
    try {

        const result = await user.findOne({
            where: {
                id: userId,
            },
            raw: true,
            nest: true,
            include: {
                model: shop,
                as: 'shop',
                attributes: {
                    include: ['id', 'name']
                }
            },
            attributes: {
                exclude: ['password']
            }
        })
        if (result) {
            if (result.shop.id == null) {
                delete result.shop
            }
            res.send(response.success(result))
        }
        else {
            res.send(response.error("Failed to fetch user details"))
        }
    } catch (error) {
        console.log(error)
        res.send(response.error("Failed to fetch user details"))
    }
}

module.exports = {
    getUserDetailsById
}