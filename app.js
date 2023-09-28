const express = require("express")
const app = express()
const session = require("express-session")
const port = 3000
const routerMain = require("./routers/routerMain")
app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))
app.set('trust proxy', 1) 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    saveSite: true
 }
}))


app.use("/", routerMain)


app.listen(port, () => {
    console.log("Beli 3 gorengan berapa", port);
})
