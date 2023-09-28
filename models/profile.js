'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.hasMany(models.User)
      Profile.hasOne(models.List)
    }
  }
  Profile.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Name is required"
        },
        notEmpty: {
          msg: "Name is required"
        }
      }
    },
    photoProfile: DataTypes.STRING,
  },{
    sequelize,
    modelName: 'Profile',
  });
  Profile.beforeCreate((profile, option) => {
    if(!profile.photoProfile) {
      profile.photoProfile = "https://www.whitechapelgallery.org/wp-content/uploads/2020/07/blank-head-profile-pic-for-a-man.jpg"
    }
  })
  return Profile;
};