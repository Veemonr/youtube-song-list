const express = require("express")
const routerList = express.Router()
const controllerList = require("../controllers/controllerList")

routerList.get("/", controllerList.showList)
routerList.get("/add", controllerList.addList)
routerList.post("/add", controllerList.addHandler)
routerList.get("/hacktube/:id", controllerList.playSong)

module.exports = routerList