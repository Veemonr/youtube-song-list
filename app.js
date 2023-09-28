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







// const axios = require("axios")
// const {ListSong, Profile, Song, User, List} = require("./models/index")
// const bcryptjs = require("bcryptjs")



// const url = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=a51VH9BYzZA&fields=items(id,snippet)&key=AIzaSyD5rA_FL6gOvMErlJKnNeIZ3P0yPV8HvO4"
// axios.get(url)
//  .then(result => {
//     console.log(result.data.items);
//  })