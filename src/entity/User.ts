import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { BaseEntity } from "./BaseEntity"

@Entity({ name: 'User'})
export class User extends BaseEntity{

    @Column({type: 'varchar', length: 100})
    name: String

    @Column({type: 'varchar', length: 200})
    photo: String

    @Column({type: 'varchar', length: 200})
    email: String

    @Column({default: false})
    isRoot: boolean

    @Column({type: 'varchar', length: 100})
    password: String

}

