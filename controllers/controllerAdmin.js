const e = require("express")
const {Song} = require("../models/index")

class ControllerAdmin {
    static adminHome(req, res) {
        const user = req.session.user
        const {search} = req.query
        Song.searchSongs(search)
         .then(Songs => {
             res.render("admin/adminSongList", {user, Songs})
         })
    }

    static addSong(req, res) {
      let {error} = req.query 
      if(error){
          error = error.split(",")
      }
        const user = req.session.user
        res.render("admin/addSong", {user, error})
    }

    static addHandler(req, res) {
        const {songURL, title, channelName} = req.body
        Song.create({songURL, title, channelName})
         .then(() => {
            res.redirect("/admin")
         })
         .catch(err =>{
            if(err.name === "SequelizeValidationError") {
               const error = err.errors.map(el => el.message)
               res.redirect(`/admin/addsong/?error=${error}`)
           }
           else {
               res.send(err)
           }
         })
    }

    static editPage(req, res) {
         let {error} = req.query 
         if(error){
            error = error.split(",")
         }
        const id = req.params.id
        const user = req.session.user
        Song.findByPk(id)
         .then(editSong => {
            res.render("admin/editSong", {editSong, user, error})
         })
          .catch(err => {
            res.send(err)
          })
    }

    static editHandler(req, res) {
        const id = req.params.id
        const {channelName, title} = req.body
        Song.update({channelName, title}, {where : {id}})
         .then(() => {
            res.redirect("/admin")
         })
         .catch(err => {
            if(err.name === "SequelizeValidationError") {
               const error = err.errors.map(el => el.message)
               res.redirect(`/admin/edit/${id}/?error=${error}`)
           }
           else {
               res.send(err)
           }
         })
    }

    static deleteSong(req, res) {
        const id = req.params.id
        Song.destroy({where:{id}})
         .then(() => {
            res.redirect("/admin")
         })
         .catch(err => {
            res.send(err)
         })
    }

}

module.exports = ControllerAdmin