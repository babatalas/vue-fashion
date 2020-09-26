"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // UserId: {
        //   type: Sequelize.INTEGER
        // },
        // firstName: {
        //   type: Sequelize.STRING
        // },
        // lastName: {
        //   type: Sequelize.STRING
        // },
        // ProfilePicture: {
        //   type: Sequelize.INTEGER
        // },
        // createdAt: {
        //   allowNull: false,
        //   type: Sequelize.DATE
        // },
        // updatedAt: {
        //   allowNull: false,
        //   type: Sequelize.DATE
        // }
        await queryInterface.bulkInsert(
            "UserProfiles",
            [
                {
                    UserId: 1,
                    firstName: "Admin",
                    lastName: "Zero",
                    profilePicture:
                        "https://demos.creative-tim.com/argon-design-system-pro/assets/img/faces/christian.jpg",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    UserId: 2,
                    firstName: "User",
                    lastName: "One",
                    profilePicture:
                        "https://demos.creative-tim.com/argon-design-system-pro/assets/img/faces/christian.jpg",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {
                validate: true,
                individualHooks: true,
            }
        );
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("UserProfiles", null, {});
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
