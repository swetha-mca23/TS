import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Customer } from "./entities/Customer";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "Swetha*2003",
    database: process.env.DB_NAME || "TS",
    entities: [Customer], 
    migrations: ["src/migrations/*.ts"],
    synchronize: true,
    logging: false,
});
