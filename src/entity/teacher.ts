import { Entity, PrimaryGeneratedColumn, Column, Unique, PrimaryColumn } from "typeorm"

@Entity()
export class Teacher {

    @PrimaryGeneratedColumn()
    id: number

    @PrimaryColumn()
    email: string

    @Column()
    createdDate: Date

    @Column()
    updatedDate: Date

}