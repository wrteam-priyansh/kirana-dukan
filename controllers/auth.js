require("dotenv").config()
const { validationResult } = require("express-validator")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const response = require("../utils/response")
const { user } = require("../models")



const login = async (req, res) => {


    try {
        const result = await user.findOne({
            where: {
                email: req.body.email
            },

        });
        if (result) {
            //check for password
            const matchedPassword = await bcrypt.compare(req.body.password, result.password);
            if (matchedPassword) {
                //will create token
                const token = jwt.sign({
                    "email": result.email,
                    "userId": result.id,
                    "roleId": result.roleId
                }, process.env.JWTTOKEN_SECRET_KEY);
                res.send(response.success({
                    "userId": result.id,
                    "token": token
                }));
            }
            else {
                //password is not correct
                res.send(response.error("Invalid email or password"));
            }
        }
        else {
            res.send(response.error("Invalid email or password"));
        }
    }
    catch (error) {
        //it will be true only for sequelize error
        if (error.errors) {
            res.send(response.error(error.errors.map((e) => e.message)[0]));
            return;
        }
        console.log(error);
        res.send(response.error("Unable to login"));
    }
}


const register = async (req, res) => {


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
        res.send(response.success(createdUser))

    } catch (error) {
        if (error.errors) {
            //Error from database side (Like email not unique, Value is null)
            res.send(response.error(error.errors[0].message))
            return;
        }
        res.send(response.error("Unable to register account"))
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