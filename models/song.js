'use strict';
const {findIdYoutube} = require("../helper/helper")
const youtubeThumbnail = require('youtube-thumbnail');
const {Op} = require("sequelize")
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Song.hasMany(models.ListSong)
      Song.belongsToMany(models.List ,{
        through: "ListSong",
      })
    }

    static searchSongs(filter) {
      const option = {}
      if(filter) {
        option.where = {title : {[Op.iLike]: `%${filter}%`}}
      }
      return Song.findAll(option)
    }

    get findId() {
      return findIdYoutube(this.songURL)
    }

    getImage() {
      const image = youtubeThumbnail(this.songURL)
      return image.default.url
    }
  }
  Song.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Title is required"
        },
        notEmpty: {
          msg: "Title is required"
        }
      }
    },
    idYoutube: DataTypes.STRING,
    channelName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Channel Name is required"
        },
        notEmpty: {
          msg: "Channel Name is required"
        }
      }
    },
    songURL: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Song URL is required"
        },
        notEmpty: {
          msg: "Song URL is required"
        },
        contains: {
          args: ["youtube"],
          msg: "Song URL is required from youtube link"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Song',
  });
  Song.beforeCreate((song, option) => {

    song.idYoutube = song.findId
  })
  return Song;
};