"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "Products",
            [
                {
                    name: "Ginger scarf",
                    description:
                        "Scarves keep you warm.  Yes, a  practical purpose! Even a lightweight synthetic around your neck will keep you comfortable when it’s breezy –  indoors or out.",
                    stock: 29,
                    price: 190000,
                    imageUrls: [
                        "https://cdn.glitch.com/a597fe3a-1724-4fcf-8d0c-3a7d4f205d93/ginger-scarf.jpg",
                    ],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Blue stone mug",
                    description:
                        "The Grey Stone mug from House Doctor will add some rustic style to the table. The attractive mug is dishwasher and microwave safe.",
                    stock: 35,
                    price: 129000,
                    imageUrls: [
                        "https://cdn.glitch.com/a597fe3a-1724-4fcf-8d0c-3a7d4f205d93/blue-stone-mug.jpg",
                    ],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Cerise scallop tee",
                    description: [
                        "Details, A delicately scalloped neckline and elbow-length sleeves bring a graceful touch to our superbly soft pima cotton tee.",
                    ],
                    stock: 29,
                    price: 109000,
                    imageUrls: [
                        "https://cdn.glitch.com/a597fe3a-1724-4fcf-8d0c-3a7d4f205d93/cerise-scallop.jpg",
                    ],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Chambray napkins",
                    description:
                        "Ultra-soft cotton chambray Montgomery napkins, cocktail napkins, and placemats are finished with with coordinating tonal lettuce edging.",
                    stock: 20,
                    price: 129000,
                    imageUrls: [
                        "https://cdn.glitch.com/a597fe3a-1724-4fcf-8d0c-3a7d4f205d93/chambray-napkins.jpg",
                    ],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Fine lines tee",
                    description:
                        "A slightly different take on a classic striped jersey top, the 100% cotton Rae Top from AND/OR comes with ruffle sleeves adding just a hint of girly appeal.",
                    stock: 30,
                    price: 89000,
                    imageUrls: [
                        "https://cdn.glitch.com/a597fe3a-1724-4fcf-8d0c-3a7d4f205d93/fine-lines.jpg",
                    ],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Gatsby hat",
                    description:
                        "The homburg is a truly iconic style, more commonly worn in a formal setting, but can also be matched with a more casual attire.",
                    stock: 40,
                    price: 139000,
                    imageUrls: [
                        "https://cdn.glitch.com/a597fe3a-1724-4fcf-8d0c-3a7d4f205d93/gatsby-hat.jpg",
                    ],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Vagabond sack",
                    description:
                        "Urban style backpack made of black calfskin. The backpack has a comfortable external pocket that closes via a matte black waterproof zip.",
                    stock: 24,
                    price: 159000,
                    imageUrls: [
                        "https://cdn.glitch.com/a597fe3a-1724-4fcf-8d0c-3a7d4f205d93/vagabond-sack.jpg",
                    ],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Walter henley (white)",
                    description:
                        "Update your basics wardrobe with practical pieces like this top from Huga. Its solid color fabric is styled with a Henley placket.",
                    stock: 10,
                    price: 149000,
                    imageUrls: [
                        "https://cdn.glitch.com/a597fe3a-1724-4fcf-8d0c-3a7d4f205d93/walter-henley.jpg",
                    ],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {},
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
