
const {User, Profile} = require("../models/index")
const bcryptjs = require("bcryptjs")

class ControllerLanding {
    static landingPage(req, res) {
        res.render("landing/landingPage")
    }

    static registerPage(req, res) {
        let {error} = req.query 
        if(error){
            error = error.split(",")
        }
        res.render("landing/register", {error})
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
            if(err.name === "SequelizeValidationError") {
                const error = err.errors.map(el => el.message)
                res.redirect(`/register?error=${error}`)
            }
            else {
                res.send(err)
            }
         })
    }

    static loginPage(req, res) {
                let {error} = req.query 
        if(error){
            error = error.split(",")
        }
        res.render("landing/login", {error})
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
                    return res.redirect("/lists")
                }
                else {
                    const msg = "Password or Username is invalid"
                    return res.redirect(`/login?error=${msg}`)
                }   
            }
            const msg = "Password or Username is invalid"
            res.redirect(`/login?error=${msg}`)
         })
         .catch(err => {
            res.send(err)
         })
    }

    static checkAdmin(req, res, next) {
        const user = req.session?.user
        if(user?.role === "Admin") {
            next()
        }
        else {
            const loginWarn = "Khusus Admin Bro"
            res.redirect(`/login?error=${loginWarn}`)
        }
    }

    static checkLogin(req, res, next) {
        const user = req.session?.user
        if(user?.id) {
            next()
        }
        else {
            const loginWarn = "Login Dulu Bro"
            res.redirect(`/login?error=${loginWarn}`)
        }
    }

    static logout(req, res) {
        delete req.session.user
        res.redirect("/")
    }
}

module.exports = ControllerLanding