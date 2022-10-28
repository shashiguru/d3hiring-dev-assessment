import "reflect-metadata"
import { DataSource } from "typeorm"
import { Registration } from "../entity/registration"
import { Student } from "../entity/student"
import { Teacher } from "../entity/teacher"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "sql12.freemysqlhosting.net",
    port: 3306,
    username: "sql12529989",
    password: "H41PrWkcn2",
    database: "sql12529989",
    synchronize: true,
    logging: false,
    entities: [Student, Teacher, Registration],
    migrations: [],
    subscribers: [],
})
