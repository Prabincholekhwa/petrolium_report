import { SaleInterface, ArgsSaleInterface } from "../interfaces";
import { SaleRepository } from "../repositories";
import { WhereOptions, Sequelize, Attributes, IncludeOptions, Op } from "sequelize";
import PetroliumProduct from "../models/petroleumProduct";
import Country from "../models/country";
import { SortEnum } from "../enums";
export class SaleService {
    private repository: SaleRepository;

    constructor() {
        this.repository = new SaleRepository();
    }

    async bulkCreate(input: []): Promise<void> {
        await this.repository.bulkCreate(input);
    }


    findAll(where?: WhereOptions<any>, group?: string[]): Promise<any[]> {
        return this.repository.findAll({ where, group });
    }

    findAndCountAll({
        offset,
        limit,
        search,
        sort,
        order,
        countryId,
        year,
        productId
    }: ArgsSaleInterface): Promise<{
        count: number;
        rows: SaleInterface[];
    }> {
        const include: IncludeOptions[] = [
            {
                model: PetroliumProduct,
                as: "petrolium_product",
                attributes: ["id", "name"],
            },
            {
                model: Country,
                as: "country",
                attributes: ["id", "name"],
            },
        ];
    
        let where: WhereOptions<any> = {};
    
        if (countryId) {
            where.countryId = countryId;
        }
    
        if (year) {
            where.year = year;
        }
    
        if (productId) {
            where.productId = productId;
        }
    
        return this.repository.findAndCountAll({
            include,
            where,
             attributes: [
                "id",
                "sale_amount",
                "year", 
            ],
            offset,
            limit,
            order: [[order, sort]],
        });
    }
    
    
    

    async findOne(where?: WhereOptions<any>): Promise<SaleInterface> {
        return this.repository.findOne({ where });
    }

    async findWithTotalSale(where?: WhereOptions<any>, attributes?: Attributes<any>, group?: string[]): Promise<any[]> {
        const include: IncludeOptions[] = [
            {
                model: PetroliumProduct,
                as: "petrolium_product",
                attributes: ['name', 'id'],
            },
        ];
        return this.repository.findAll({
            where,
            attributes: [
                'product_id',
                [this.repository.model.sequelize.fn('sum', this.repository.model.sequelize.col('sale_amount')), 'totalSaleAmount'],
            ],
            group: group || ['product_id', 'petrolium_product.id'],
            include
        });
    }


    async findTopAndBottomCountries(): Promise<{
        topCountries: any[];
        bottomCountries: any[];
    }> {
        const include: IncludeOptions[] = [
            {
                model: Country,
                as: "country",
                attributes: ["name", "id"],
            },
        ];

        const topCountries = await this.repository.findAll({
            attributes: [
                [
                    this.repository.model.sequelize.fn(
                        "coalesce",
                        this.repository.model.sequelize.fn("sum", this.repository.model.sequelize.col("sales.sale_amount")),
                        0
                    ),
                    "totalSaleAmount",
                ],
                "country.id",
                "country.name",
            ],
            include,
            group: ["country.id", "country.name"],
            order: [
                [this.repository.model.sequelize.literal("\"totalSaleAmount\""), "DESC"],
            ],
            limit: 3,
        });

        const bottomCountries = await this.repository.findAll({
            attributes: [
                [
                    this.repository.model.sequelize.fn(
                        "coalesce",
                        this.repository.model.sequelize.fn("sum", this.repository.model.sequelize.col("sales.sale_amount")),
                        0
                    ),
                    "totalSaleAmount",
                ],
                "country.id",
                "country.name",
            ],
            include,
            group: ["country.id", "country.name"],
            order: [
                [this.repository.model.sequelize.literal("\"totalSaleAmount\""), "ASC"],
            ],
            limit: 3,
        });

        return { topCountries, bottomCountries };
    }


    async calculateAverageSaleByYearRange(): Promise<any[]> {
        const include: IncludeOptions[] = [
            {
                model: PetroliumProduct,
                as: "petrolium_product",
                attributes: ["id", "name"],
            },
        ];

        const where: WhereOptions<any> = {
            sale_amount: {
                [Op.ne]: 0,
            },
        };

        const result20072010 = await this.repository.findAndCountAll({
            attributes: [
                [
                    Sequelize.fn("AVG", Sequelize.col("sale_amount")),
                    "average_sale",
                ],
                [Sequelize.literal("'2007-2010'"), "year_range"],
                "petrolium_product.id",
                "petrolium_product.name",
            ],
            include,
            where: {
                ...where,
                year: {
                    [Op.between]: [2007, 2010],
                },
            },
            group: ["petrolium_product.id", "petrolium_product.name"],
        });

        const result20112014 = await this.repository.findAndCountAll({
            attributes: [
                [
                    Sequelize.fn("AVG", Sequelize.col("sale_amount")),
                    "average_sale",
                ],
                [Sequelize.literal("'2011-2014'"), "year_range"],
                "petrolium_product.id",
                "petrolium_product.name",
            ],
            include,
            where: {
                ...where,
                year: {
                    [Op.between]: [2011, 2014],
                },
            },
            group: ["petrolium_product.id", "petrolium_product.name"],
        });

        const concatenatedArray = result20072010.rows.concat(result20112014.rows);
        const sortedArray = concatenatedArray.sort((a: any, b: any) =>
            a.petrolium_product.name.localeCompare(b.petrolium_product.name)
        );
        return sortedArray;
    }

}