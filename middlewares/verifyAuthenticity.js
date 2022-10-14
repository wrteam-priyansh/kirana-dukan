require("dotenv").config()
const jwt = require("jsonwebtoken");
const response = require("../utils/response")


const verifyAuthenticity = (req, res, next) => {

    try {
        //check for authorization (Bearer token)
        const authorization = req.get("Authorization");
        if (!authorization) {
            res.send(response.accessDenied());

        }
        else {
            if (authorization.split(" ")[0] !== "Bearer") {
                res.send(response.accessDenied());
                return;
            }
            //fetching token
            const token = authorization.split(" ")[1];
            //verifying token
            const verifiedToken = jwt.verify(token, process.env.JWTTOKEN_SECRET_KEY);
            //invalid token
            if (!verifiedToken) {
                res.send(response.error("Invalid token"));
            }
            else {
                //email,userId,roleId these are the fileds we are using

                req.userId = verifiedToken.userId;
                req.email = verifiedToken.email;
                req.roleId = verifiedToken.roleId;
                next();
            }
        }
    }
    catch (error) {
        res.send(response.error("Could not vefiry token"));
    }

}

module.exports = verifyAuthenticity;