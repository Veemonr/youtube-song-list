const {User, Profile} = require("../models/index")

class ControllerLanding {
    static landingPage(req, res) {
        res.render("landing/landingPage")
    }

    static registerPage(req, res) {
        res.render("landing/register")
    }

    static registerHandler(req, res) {
        const {name, password, email, role} = req.body
        Profile.create({name})
         .then((data) => {
            console.log(data);
        })
         .catch(err => {
            res.send(err)
         })
    }
}

module.exports = ControllerLanding