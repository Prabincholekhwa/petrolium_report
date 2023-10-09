import { InputSaleInterface, SaleInterface } from "../interfaces";
import { BaseRepository } from "./baseRepository";
import Model from "../models";

export class SaleRepository extends BaseRepository<
    InputSaleInterface,
    SaleInterface
>{
    constructor(){
        super(Model.Sale);
    }
}