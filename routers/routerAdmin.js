const express = require("express")
const routerAdmin = express.Router()
const ControllerAdmin = require("../controllers/controllerAdmin")

routerAdmin.get("/", ControllerAdmin.adminHome)
routerAdmin.get("/addsong", ControllerAdmin.addSong)
routerAdmin.post("/addsong", ControllerAdmin.addHandler)
routerAdmin.get("/edit/:id", ControllerAdmin.editPage)
routerAdmin.post("/edit/:id", ControllerAdmin.editHandler)
routerAdmin.get("/delete/:id", ControllerAdmin.deleteSong)


module.exports = routerAdmin