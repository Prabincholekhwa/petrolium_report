import * as Sequelize from "sequelize";
import {
    ModelTimestampExtend,
}
    from "..";
export interface InputCountryInterface {
    name: string;
}

export interface CountryInterface extends ModelTimestampExtend {
    id: Sequelize.CreationOptional<number>;
    name: string;
}

export interface CountryModelInterface
    extends Sequelize.Model<CountryInterface, Partial<InputCountryInterface>>,
    CountryInterface { }
