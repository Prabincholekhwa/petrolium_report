import * as Sequelize from "sequelize";
import { CountryModelInterface } from "../interfaces";
import { Database } from "./databaseInstance";
import Sale from "./sale";


const sequelize = Database.sequelize;

const Country = sequelize.define<CountryModelInterface>(
    "countries",
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

Sale.belongsTo(Country, {
    foreignKey:"countryId",
    as:"country"
});

Country.hasMany(Sale,{
    foreignKey:"countryId",
    as:"sales"
});

export default Country;
