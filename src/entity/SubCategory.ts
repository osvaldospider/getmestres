import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Category } from "../entity/Category";

@Entity({ name: 'SubCategory'})
export class SubCategory extends BaseEntity{
    
    @Column({type: 'varchar', length: 100})
    name: string

    @Column({type: 'varchar', length:1000, nullable:true})
    description: string

    @Column()
    cost: number

    @ManyToOne(()=> Category, {eager:true}) //AutoPopulate 
    category : Category
}