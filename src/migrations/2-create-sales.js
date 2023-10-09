'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('sales', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            product_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "petrolium_products",
                    key: "id",
                }
            },
            country_id:{
                type:Sequelize.INTEGER,
                allowNull: false,
                references:{
                    model:"countries",
                    key:"id"
                }
            },
            sale_amount: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            year:{
                type:Sequelize.INTEGER,
                allowNull:false
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            deleted_at: {
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('sales');
    }
};
