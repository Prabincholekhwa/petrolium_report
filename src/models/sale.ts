import * as Sequelize from "sequelize";
import { SaleModelInterface } from "../interfaces";
import {Database} from "./databaseInstance";
const sequelize = Database.sequelize;

const Sale = sequelize.define<SaleModelInterface>(
    "sales",
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
          },
         year:{
            type: Sequelize.INTEGER,
            allowNull:false,
            field: "year"
         },
          saleAmount:{
            type: Sequelize.INTEGER,
            allowNull:false,
            field:"sale_amount"
          },
          countryId:{
            type:Sequelize.INTEGER,
            allowNull: false,
            field: "country_id"
          },
          productId:{
            type: Sequelize.INTEGER,
            allowNull:false,
            field:"product_id"
          }
    },
    {
      timestamps:true,
      paranoid: true,
      underscored:true  
    }
);



export default Sale;