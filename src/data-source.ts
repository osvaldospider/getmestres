import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Category } from "./entity/Category"
import { SubCategory } from "./entity/SubCategory"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin123",
    database: "getmestres",
    synchronize: true,
    logging: true,
    entities: [User, Category, SubCategory],
    migrations: [],
    subscribers: [],
})
