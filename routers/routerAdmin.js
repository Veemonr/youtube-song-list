const express = require("express")
const routerAdmin = express.Router()
const ControllerAdmin = require("../controllers/controllerAdmin")

routerAdmin.get("/", ControllerAdmin.adminHome)


module.exports = routerAdmin