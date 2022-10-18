const { validationResult } = require("express-validator")
const response = require("../utils/response")
const validateRequestBody = (req, res, next) => {
    const errors = validationResult(req);

    //checking validation error
    if (!errors.isEmpty()) {
        //const errorParam = errors.array()[0].param;
        const errorMsg = errors.array()[0].msg;
        res.send(response.error(errorMsg));
        return;
    }
    next()
}

module.exports = validateRequestBody;