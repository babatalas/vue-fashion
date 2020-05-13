'use strict';
const {hashPassword} = require('../helpers')
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class User extends Model {}

  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: 'First name cannot be empty'
        }
      }
    },
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: 'Email cannot be empty'
        },
        isEmail: {
          msg: 'Your email input is not valid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: 'Password cannot be empty'
        },
        len: {
          args: [5, 16],
          msg: 'Password must be 5-16 characters long'
        }
      }
    },
    RoleId: {
      type: DataTypes.INTEGER,
    },
  }, {sequelize});

  User.associate = function(models) {
    User.belongsTo(models.Role)
  };

  User.beforeCreate(async (instance, options) => {
    const hash = await hashPassword(instance.password)
    instance.password = hash
    if (!instance.lastName) instance.lastName = instance.firstName
    instance.RoleId = 2
  })

  return User;
};