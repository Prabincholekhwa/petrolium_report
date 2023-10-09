'use strict';

import sequelize from "sequelize";
import { db, environment } from "../config";
import { EnvironmentEnum } from "../enums";

class Database {
    public sequelize: sequelize.Sequelize;
    private static instance: Database;
    private dialect: sequelize.Dialect;
    private dbname: string;
    private username: string;
    private password: string;
    private host: string;
    private port: number;
    private maxPool: number;
    private minPool: number;

    private constructor() {
        this.dialect = db.dialect;
        this.dbname = db.name;
        this.username = db.username;
        this.password = db.password;
        this.host = db.host;
        this.port = db.port;
        this.maxPool = 10;
        this.minPool = 1;

        this.sequelize = new sequelize.Sequelize(
            this.dbname,
            this.username,
            this.password,
            {
                host: this.host,
                dialect: this.dialect,
                dialectOptions: {
                    encrypt: true,
                },
                port: this.port,
                logging: true,
                pool: {
                    max: this.maxPool,
                    min: this.minPool,
                    acquire: 30000,
                    idle: 10000,
                },
                define: {
                    timestamps: true,
                    createdAt: true,
                    updatedAt: true,
                },
            }
        );
    }

    static get(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    async connection() {
        const isDevelopment: boolean = environment === EnvironmentEnum.development;
        try {
            await this.sequelize.authenticate();
            console.log("Database Connected Successfully");
        }
        catch (error: any) {
            throw new Error(`Connection Failed: ${error}`)
        }
    }
}

const database = Database.get();
export { database as Database };