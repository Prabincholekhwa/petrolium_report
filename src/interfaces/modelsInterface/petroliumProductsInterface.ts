import * as Sequelize from "sequelize";
import {
    ModelTimestampExtend,
}
    from "..";
export interface InputPetroliumProductInterface {
    name: string;
}

export interface PetroliumProductInterface extends ModelTimestampExtend {
    id: Sequelize.CreationOptional<number>;
    name: string;
}

export interface PetroliumProductModelInterface
    extends Sequelize.Model<PetroliumProductInterface, Partial<InputPetroliumProductInterface>>,
    PetroliumProductInterface { }