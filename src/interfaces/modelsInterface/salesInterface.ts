import * as Sequelize from "sequelize";
import {
    ModelTimestampExtend,
    PaginationOrderSearchExtend
}
    from "..";
import { SortEnum } from "../../enums";
export interface InputSaleInterface {
    year: number;
    saleAmount: number;
    countryId:number;
    productId:number
}

export interface SaleInterface extends ModelTimestampExtend {
    id: Sequelize.CreationOptional<number>;
    year: number;
    saleAmount: number;
    countryId:number;
    productId:number
}

export interface SaleModelInterface
    extends Sequelize.Model<SaleInterface, Partial<InputSaleInterface>>,
    SaleInterface { }

export interface ArgsSaleInterface extends PaginationOrderSearchExtend {
    order: string;
    sort: SortEnum;
    countryId:number;
    year:number;
    productId:number;
}