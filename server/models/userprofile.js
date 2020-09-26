"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserProfile extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    UserProfile.init(
        {
            UserId: DataTypes.INTEGER,
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "First name cannot be empty",
                    },
                },
            },
            lastName: DataTypes.STRING,
            profilePicture: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "UserProfile",
        }
    );
    return UserProfile;
};
