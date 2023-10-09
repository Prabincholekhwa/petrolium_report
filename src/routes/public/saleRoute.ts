import { RouterClass } from "../../classes";
import { SaleController } from "../../controllers";
import { exceptionHandler } from "../../middlewares";

export class SaleRouter extends RouterClass {

    constructor() {
        super();
    }

    define(): void {
        this.router.route("/").get(exceptionHandler(SaleController.lists));
        this.router.route("/product-total-sell").get(exceptionHandler(SaleController.getSumOfSaleAmountByProduct));
        this.router.route("/top-countries-sell").get(exceptionHandler(SaleController.getTop3Countries));
        this.router.route("/product-average-sell").get(exceptionHandler(SaleController.getAverageSale));
    }
}