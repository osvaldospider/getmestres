import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { SubCategory } from "../entity/SubCategory";
import { QuestionType } from "./enum/QuestionType";

@Entity({ name: 'Question'})
export class Question extends BaseEntity{

    @Column({type: 'varchar', length:200})
    question: string

    @Column()
    type: QuestionType

    @Column({type: 'varchar', length:2000, nullable:true})
    options: string

    @ManyToOne(()=> SubCategory, {eager:true}) //AutoPopulate 
    subCategory : SubCategory
}