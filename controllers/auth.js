const { validationResult } = require("express-validator")
const bcrypt = require("bcryptjs");
const response = require("../utils/response")
const { user } = require("../models")


const login = async (req, res) => {
    console.log(req.body)
    res.json({
        "error": false,
        "user": {
            "name": "Priyansh",
            "id": "1"
        }
    })
}

const register = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json(response.error(errors.errors[0].msg))
        return;
    }
    //name,phoneNumber,password,roleId,email (fields)
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 12);

        const { id, email, name, roleId, phoneNumber, createdAt } = await user.create({
            "name": req.body.name,
            "password": hashedPassword,
            "roleId": req.body.roleId,
            "phoneNumber": req.body.phoneNumber,
            "email": req.body.email
        });
        const createdUser = { id, email, name, roleId, phoneNumber, createdAt }
        res.json(response.success(createdUser))

    } catch (error) {
        if (error.errors) {
            //Error from database side (Like email not unique, Value is null)
            res.json(response.error(error.errors[0].message))
            return;
        }
        res.json(response.error("Unable to register account"))
    }



}

module.exports = {
    login, register
}



/*
{
  formatter: [Function: formatter],
  errors: [
    {
      value: undefined,
      msg: 'Please enter email',
      param: 'email',
      location: 'body'
    }
  ]
}

*/