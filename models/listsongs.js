'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ListSong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ListSong.belongsTo(models.Song)
      ListSong.belongsTo(models.List)
    }
  }
  ListSong.init({
    name: DataTypes.STRING,
    ListId: DataTypes.INTEGER,
    SongId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ListSong',
  });
  return ListSong;
};