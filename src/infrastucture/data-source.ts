import "reflect-metadata"
import { DataSource } from "typeorm"
import { Registration } from "../entity/registration"
import { Student } from "../entity/student"
import { Teacher } from "../entity/teacher"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "sql6.freemysqlhosting.net",
    port: 3306,
    username: "sql6528223",
    password: "qilk9h8bDV",
    database: "sql6528223",
    synchronize: true,
    logging: false,
    entities: [Student, Teacher, Registration],
    migrations: [],
    subscribers: [],
})
