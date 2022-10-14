
const express = require("express");
require('dotenv').config();
//
const port = process.env.PORT || 3000;
const { sequelize } = require("./models");
const app = express()

//Routes 
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoute)
app.use("/api/v1/users", userRoute)





app.listen(port, async () => {
    console.log("Server running on " + port);
    await sequelize.authenticate();
    console.log("Database connected");

})