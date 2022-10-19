const response = require("../utils/response")
const { category } = require("../models")


const getCategories = async (req, res) => {
    try {

        const result = await category.findAll()

        if (result) {
            res.send(response.success(result))
        }
        else {
            res.send(response.error("Failed to fetch categories"))
        }

    } catch (error) {
        res.send(response.error("Failed to fetch categories"))
    }
}


const getCategoryDetailsById = async (req, res) => {

    try {
        const categoryId = req.params.categoryId;
        if (!parseInt(categoryId)) {
            res.send(response.error("Please enter valid category id"))
            return;
        }
        const result = await category.findOne({
            where: {
                id: categoryId
            }
        })
        if (result) {
            res.send(response.success(result))
        }
        else {
            res.send(response.error("Failed to fetch category details"))
        }
    } catch (error) {
        res.send(response.error("Failed to fetch category details"))
    }
}

const addCategory = async (req, res) => {
    try {

        const result = await category.create(req.body)
        if (result) {
            res.send(response.success(result))
        }
        else {
            res.send(response.error("Failed to add category"))
        }
    } catch (error) {

        res.send(response.error("Failed to add category"))
    }
}

const editCategory = async (req, res) => {
    try {

        const categoryId = req.params.categoryId

        if (!parseInt(categoryId)) {
            res.send(response.error("Please enter valid categoryId"))
            return;
        }
        //It will remove empny or null values 
        let updateFields = req.body
        Object.keys(req.body).forEach((value) => {
            if (updateFields[value] == "" || updateFields[value] == null) {
                delete updateFields[value]
            }
        })

        const result = await category.update(updateFields, {
            where: {
                id: categoryId
            },
            returning: true,
        });

        if (result) {
            const updatedResult = result[1][0];//Update return [1,[{}]]
            res.send(response.success(updatedResult))
        }
        else {
            res.send(response.error("Failed to update category"))
        }
    } catch (error) {

        res.send(response.error("Failed to update category"))
    }
}


const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId

        if (!parseInt(categoryId)) {
            res.send(response.error("Please enter valid categoryId"))
            return;
        }

        await category.destroy({
            where: {
                id: categoryId
            },
        })

        res.send(response.success("Category deleted successfully"))

    } catch (error) {
        res.send(response.error("Failed to delete category"))
    }
}


module.exports = {
    getCategories, getCategoryDetailsById, addCategory, editCategory, deleteCategory
}