'use strict';
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
  }
  Song.init({
    title: DataTypes.STRING,
    idYoutube: DataTypes.STRING,
    channelName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};