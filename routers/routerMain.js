const express = require("express")
const routerMain = express.Router()
const routerAdmin = require("./routerAdmin")
const routerList = require("./routerList")
const ControllerLanding = require("../controllers/controllerLanding")

routerMain.get("/", ControllerLanding.landingPage)
routerMain.get("/register", ControllerLanding.registerPage)
routerMain.post("/register", ControllerLanding.registerHandler)
routerMain.get("/login", ControllerLanding.loginPage)
routerMain.get("/logout", ControllerLanding.logout)
routerMain.post("/login", ControllerLanding.loginHandler)

routerMain.use(ControllerLanding.checkLogin)

routerMain.use("/lists", routerList)

routerMain.use(ControllerLanding.checkAdmin)

routerMain.use("/admin" , routerAdmin)

module.exports = routerMain