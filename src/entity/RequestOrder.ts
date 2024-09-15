import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { RequestStatus } from "./enum/RequestStatus"
import { Customer} from "./Customer"
import { ServiceProvider } from "./ServiceProvider";

@Entity({ name: 'RequestOrder'})
export class RequestOrder extends BaseEntity{

    @Column({type: 'varchar', length:100})
    longlat: string

    @Column({type: 'varchar', length:200})
    title: string

    @Column({type: 'varchar', length:2000})
    description: string

    @Column()
    statusOrder: RequestStatus;

    @ManyToOne(() => Customer, {eager: true})
    custumer: Customer;

    @ManyToOne(() => ServiceProvider, {eager: true, nullable:true})
    serviceProvider: ServiceProvider;
    

}