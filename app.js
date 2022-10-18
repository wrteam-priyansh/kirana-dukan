
const express = require("express");
require('dotenv').config();
//
const port = process.env.PORT || 3000;
const { sequelize } = require("./models");
const app = express()

const apiVersion = "/api/v1";


//Routes 
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const cityRoute = require("./routes/city");
const shopRoute = require("./routes/shop");


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//Routes
app.use(`${apiVersion}/auth`, authRoute)
app.use(`${apiVersion}/users`, userRoute)
app.use(`${apiVersion}/cities`, cityRoute)
app.use(`${apiVersion}/shops`, shopRoute)



app.listen(port, async () => {
    console.log("Server running on " + port);
    await sequelize.authenticate();
    console.log("Database connected");

})