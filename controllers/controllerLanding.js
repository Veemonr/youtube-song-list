const { log } = require("console")
const {User, Profile} = require("../models/index")
const bcryptjs = require("bcryptjs")

class ControllerLanding {
    static landingPage(req, res) {
        res.render("landing/landingPage")
    }

    static registerPage(req, res) {
        res.render("landing/register")
    }

    static registerHandler(req, res) {
        const {name, password, email, role} = req.body
        let ProfileId
        Profile.create({name})
         .then((data) => {
            ProfileId = data.dataValues.id
            return User.create({name, password, email, role, ProfileId})
        })
         .then(() => {
            res.redirect("/login")
         })
         .catch(err => {
            console.log(err);
            res.send(err)
         })
    }

    static loginPage(req, res) {
        res.render("landing/login")
    }

    static loginHandler(req, res) {
        const {name, password} = req.body
        User.findOne({where :{name}})
         .then(user => {
            if(user?.dataValues){
                const passDb = user.dataValues.password
                const passCheck = bcryptjs.compareSync(password, passDb)
                if(passCheck) {
                    req.session.user = user.dataValues
                    console.log(req.session);
                    return res.redirect("/songs")
                }
                else {
                    return res.redirect("/login")
                }
            }
            res.redirect("/login")
         })
         .catch(err => {
            res.send(err)
         })
    }

    static checkAdmin(req, res, next) {
        const user = req.session?.user
        console.log(user);
        if(user?.role === "Admin") {
            next()
        }
        else {
            res.send("Khusus admin bro")
        }
    }

    static checkLogin(req, res, next) {

    }
}

module.exports = ControllerLanding