import { Request, Response } from "express";
import { SaleService } from "../services";
import { errorResponseData, successResponseData } from "../utils";
import { pgMaxLimit, pgMinLimit, defaultOrder, defaultSort } from "../config";

export class SaleController {
    constructor() {}

    static async list(req: Request, res: Response): Promise<void> {
        const data = await new SaleService().findAll();
        return successResponseData({
            message: "All Sales are fetched.",
            data: data,
            res,
        });
    }

    static async lists(req: Request, res: Response): Promise<void> {
        let { search, offset, limit, order, sort, countryId, year, productId } = req.query as any;
        offset = Number(offset) && Number(offset) > 0 ? Number(offset) - 1 : 0;
        limit = limit ? limit : pgMinLimit;
        limit = Math.min(limit, pgMaxLimit);
        search = search ? search : undefined;
        countryId = countryId ? countryId : undefined;
        productId = productId ? productId : undefined;
        year = year ? year : undefined;
        order = order ? order : defaultOrder;
        sort = sort ? sort : defaultSort;
        const { count, rows: data } = await new SaleService().findAndCountAll({
          offset,
          limit,
          search,
          sort,
          order,
          countryId,
          year,
          productId
        });
    
        return successResponseData({
          message: "All sales are fetched.",
          data,
          count,
          res,
        });
      }

      static async getSumOfSaleAmountByProduct(req: Request, res: Response): Promise<void> {
        try{
            const data = await new SaleService().findWithTotalSale();
        return successResponseData({
            message: "Sum of sale amounts for each product fetched.",
            data: data,
            res,
        });
        }
        catch(err){
            return errorResponseData({
                message: `${err}`,
                res,
            })
        }
        
    }

    static async getTop3Countries(req: Request, res: Response): Promise<void> {
        try{
            const data = await new SaleService().findTopAndBottomCountries();
        return successResponseData({
            message: "Top 3 countries fetched.",
            data: data,
            res,
        });
        }
        catch(err){
            return errorResponseData({
                message: `${err}`,
                res,
            })
        }
        
    }

    static async getAverageSale(req: Request, res: Response): Promise<void>{
        try{
            const data = await new SaleService().calculateAverageSaleByYearRange();
        return successResponseData({
            message: "Average sale of each petroleum product for 4 years of interval.",
            data: data,
            res,
        });
        }
        
        catch(err){
            console.log(err);
            return errorResponseData({
                message: `${err}`,
                res,
            })
        }
    }
}
