import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm"

@Entity()
export class Registration {

    @PrimaryColumn()
    studentEmail: string

    @PrimaryColumn()
    teacherEmail: string

    @Column()
    createdDate: Date

}
