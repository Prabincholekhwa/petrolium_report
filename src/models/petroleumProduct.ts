import * as Sequelize from "sequelize";
import { PetroliumProductModelInterface } from "../interfaces";
import { Database } from "./databaseInstance";
import Sale from "./sale";

const sequelize = Database.sequelize;

const PetroliumProduct = sequelize.define<PetroliumProductModelInterface>(
    "petrolium_products",
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name:{
            type:Sequelize.STRING(30),
            allowNull: false,
            unique: true,
            field:"name"
        }
    },
    {
        timestamps: true,
        paranoid: true,
        underscored:true
    }
);

Sale.belongsTo(PetroliumProduct,{
    foreignKey:"productId",
    as:"petrolium_product"
});

PetroliumProduct.hasMany(Sale,{
    foreignKey:"productId",
    as:"sales"
});

export default PetroliumProduct;
