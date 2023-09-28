const {List, Song, ListSong} = require("../models/index")
class ControllerList {

    static showList(req, res) {
        const user = req.session.user
        const {ProfileId} = user
        List.findAll({include: [Song], where: {ProfileId}})
         .then(ListSong => {
            res.render("songlist/playlist", {user, ListSong})
         })
         .catch(err => {
            res.send(err)
         })
    }

    static addList(req, res) {
      let {error} = req.query 
      if(error){
          error = error.split(",")
      }
        const user = req.session.user
        Song.findAll()
         .then(Songs => {
             res.render("songlist/addList", {Songs, user, error})
         })
    }

    static addHandler(req, res) {
        let ListId 
        let dataListSongs = []
        let {SongId, name, description} = req.body
        const user = req.session.user
        const {ProfileId} = user
        List.create({ProfileId, name, description})
         .then(list => {
            const listData = list.dataValues
            ListId = listData.id
            if(SongId){
               if(SongId.length === 1) SongId = [SongId]
               SongId.forEach(el => {
                   let temp = {}
                   temp.SongId = el
                   temp.ListId = ListId
                   temp.name = name
                   dataListSongs.push(temp)
               })
               return ListSong.bulkCreate(dataListSongs)
            } 
         })
         .then(() => {
            res.redirect("/lists")
         })
         .catch(err => {
            if(err.name === "SequelizeValidationError") {
               const error = err.errors.map(el => el.message)
               res.redirect(`/lists/add/?error=${error}`)
           }
           else {
            res.send(err)
           }
         })
        
    }

    static playSong(req, res) {
        const id = req.params.id
        const user = req.session.user
        Song.findByPk(id)
         .then(Song => {
            res.render("songs/hacktube", {Song, user})
         })
         .catch(err => {
            res.send(err)
         })
    }
}

module.exports = ControllerList