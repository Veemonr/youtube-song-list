const express = require("express")
const routerMain = express.Router()
const routerAdmin = require("./routerAdmin")
const routerList = require("./routerList")
const routerSongs = require("./routerSongs")
const ControllerLanding = require("../controllers/controllerLanding")
const { appendFile } = require("fs")

routerMain.get("/", ControllerLanding.landingPage)
routerMain.get("/register", ControllerLanding.registerPage)
routerMain.post("/register", ControllerLanding.registerHandler)
routerMain.get("/login", ControllerLanding.loginPage)
routerMain.post("/login", ControllerLanding.loginHandler)

routerMain.use(ControllerLanding.checkAdmin)

routerMain.use("/admin" , routerAdmin)





module.exports = routerMain