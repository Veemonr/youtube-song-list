const express = require("express")
const routerMain = express.Router()
const routerAdmin = require("./routerAdmin")
const routerList = require("./routerList")
const routerSongs = require("./routerSongs")
const ControllerLanding = require("../controllers/controllerLanding")

routerMain.get("/", ControllerLanding.landingPage)
routerMain.get("/register", ControllerLanding.registerPage)
routerMain.post("/register", ControllerLanding.registerHandler)






module.exports = routerMain