"use strict";
module.exports = (sequelize, DataTypes) => {
    const Sequelize = sequelize.Sequelize;
    const Model = Sequelize.Model;

    class Product extends Model {}

    Product.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Product name cannot be empty",
                    },
                },
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Product description cannot be empty",
                    },
                },
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Price cant be empty",
                    },
                    min: 1000,
                },
            },
            stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Stock cant be empty",
                    },
                    min: 0,
                },
            },
            imageUrls: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Product image url cannot be empty",
                    },
                },
            },
        },
        { sequelize }
    );

    Product.associate = function (models) {
        Product.belongsToMany(models.User, { through: models.Cart });
        // associations can be defined here
    };
    return Product;
};
