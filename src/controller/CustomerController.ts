import { Customer } from "../entity/Customer";
import { BaseController } from "./BaseController";
import { Request} from 'express'
import * as md5 from 'md5';

export class CustomerController extends BaseController<Customer> {

    constructor() {
        super(Customer, true);
    }

    async save(request: Request) {
        let _customer = <Customer>request.body;
        super.isRequired(_customer.name, 'O nome do cliente é obrigatório');
        super.isRequired(_customer.phone, 'O telefone do cliente é obrigatório');
        super.isRequired(_customer.email, 'O email do cliente é obrigatório');
        super.isRequired(_customer.photo, 'A foto do cliente é obrigatório');

        delete _customer.password;
        return super.save(_customer, request);
    }

    async createCustomer(request:Request){
        let _customer = <Customer>request.body;
        let { confirmPassword } = request.body;
        super.isRequired(_customer.name, 'O nome do cliente é obrigatório');
        super.isRequired(_customer.phone, 'O telefone do cliente é obrigatório');
        super.isRequired(_customer.email, 'O email do cliente é obrigatório');
        super.isRequired(_customer.photo, 'A foto do cliente é obrigatório');
        super.isRequired(_customer.password, 'A senha do cliente é obrigatório');
        super.isRequired(confirmPassword, 'A confirmação da senha do cliente é obrigatório');
        
        super.isTrue(_customer.password !== confirmPassword, 'A senha e a confirmação de senha estão diferentes');

        if(_customer.password)
            _customer.password = md5(_customer.password);
        
        return super.save(_customer, request, true);
    }
}