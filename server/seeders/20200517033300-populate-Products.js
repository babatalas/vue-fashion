"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "Products",
            [
                {
                    name: "Stilo Gra Polkadot Flare Mini Dress",
                    description:
                        "Mini dress dengan detail kancing belakang, tali serut di pinggang dan karet smocked di tangan.",
                    stock: 29,
                    price: 190000,
                    imageUrls: [
                        "https://demos.creative-tim.com/argon-design-system-pro/assets/img/pages/hat.png",
                    ],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Stilo Kinsley Plaid Ribbon Mini Dress",
                    description:
                        "Mini dress drawstring Ribbon dengan detail kancing depan.",
                    stock: 35,
                    price: 129000,
                    imageUrls: [
                        "https://demos.creative-tim.com/argon-design-system-pro/assets/img/pages/shorts.png",
                    ],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Stilo Corianna Stripe Buckle Mini Dress",
                    description: [
                        "Dress dengan tali buckle ini yang dapat dilepas ini, dapat dikenakan dengan berbagai gaya. Dapat dijadikan outer dan juga dress.",
                    ],
                    stock: 29,
                    price: 109000,
                    imageUrls: [
                        "https://demos.creative-tim.com/argon-design-system-pro/assets/img/pages/bracelet.png",
                    ],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Stilo Guillermina Plain Peplum Blouse",
                    description:
                        "Blouse peplum dengan detail resleting belakang dan pita di lengan.",
                    stock: 20,
                    price: 129000,
                    imageUrls: [
                        "https://demos.creative-tim.com/argon-design-system-pro/assets/img/pages/bullet.png",
                    ],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Stilo Nigesha Stripe Buckle Blouse",
                    description:
                        "Blouse V-neck Stripe dengan detail kancing di manset dan tali buckle di sisi samping.",
                    stock: 30,
                    price: 89000,
                    imageUrls: [
                        "https://demos.creative-tim.com/argon-design-system-pro/assets/img/pages/tshirt.png",
                    ],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Stilo Gayashi Texture Overlap Outer",
                    description:
                        "Outer Vest dengan detail Kancing depan & Pocket.",
                    stock: 40,
                    price: 139000,
                    imageUrls: [
                        "https://demos.creative-tim.com/argon-design-system-pro/assets/img/pages/bag.png",
                    ],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Stilo Haolla Plaid Double Pockets Mini Dress",
                    description:
                        "Mini dress collar dengan detail kancing depan dan fake pockets.",
                    stock: 24,
                    price: 159000,
                    imageUrls: [
                        "https://demos.creative-tim.com/argon-design-system-pro/assets/img/pages/shirt.png",
                    ],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Stilo Hijtara Stripe Drawstring Big Blouse",
                    description:
                        "Bahan tidak panas dan menyerap keringat, namun lebih mudah kusut.",
                    stock: 10,
                    price: 149000,
                    imageUrls: [
                        "https://demos.creative-tim.com/argon-design-system-pro/assets/img/pages/jeans.png",
                    ],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
        /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Products", null, {});
        /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    },
};
