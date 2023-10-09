"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "petrolium_products",
            [
                {
                    id: 101,
                    name: "Petrol",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 102,
                    name: "Diesel",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 103,
                    name: "Kerosene",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 104,
                    name: "Aviation Turbine Fuel",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 105,
                    name: "Light Diesel Oil",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 106,
                    name: "Furnace Oil",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 107,
                    name: "LPG in MT",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 108,
                    name: "Petrol",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("petrolium_products", null, {});
    },
};
