import { DataSource } from "typeorm";
import { User } from "../models/User";
import { Invoice } from "../models/Invoice";
import { Transaction } from "../models/Transaction";
import 'dotenv/config';

export const dataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: ["src/models/**/*.ts"],
    migrations: ["src/migrations/**/*.ts"],
    subscribers: ["src/subscribers/**/*.ts"]
});
export const UserRepository = dataSource.getRepository(User);
export const InvoiceRepository = dataSource.getRepository(Invoice);
export const TransactionRepository = dataSource.getRepository(Transaction);