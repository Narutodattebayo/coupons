const express = require("express");
const CONFIG = require("./config/config").CONFIG
const bootstrap = require("./src/bootstrap").boostrap
const databaseService = require("./src/entity/baseEntity").databaseService
const { router } = require("./src/routes/admin.routes")
const { errorHandler, invalidRoute } = require("./src/errorHandler")
const app = express();
initialise = async () => {
    await databaseService.connect()
    bootstrap.addAdmin();
}
initialise()

//console.log(CONFIG)
app.use(express.json())
app.use('/admin', router)
app.use(errorHandler)
app.use(invalidRoute)
app.listen(2222, () => {
    console.log("server started on", 2222)
})