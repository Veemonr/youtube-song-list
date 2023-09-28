'use strict';
const bcryptjs = require("bcryptjs")
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Profile)
    }
  }
  User.init({
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required"
        },
        notEmpty: {
          msg: "Password is required"
        },
        checkLength(value) {
          console.log(value);
          if(value.length < 8) {
            throw new Error("Password must be at least 8 words");
          }
        }
      }
    },
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
    role: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Email is required"
        },
        notEmpty: {
          msg: "Email is required"
        },
        isEmail: {
          msg: "Must be Email"
        }
      }
    },
    ProfileId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, option) => {
    const salt = bcryptjs.genSaltSync(10)
    const hash = bcryptjs.hashSync(user.password, salt)
    user.password = hash
  })
  return User;
};