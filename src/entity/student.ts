import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm"

@Entity()
export class Student {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    status: boolean

    @Column()
    createdDate: Date

    @Column()
    updatedDate: Date

}
