import { ServiceProvider } from "../entity/ServiceProvider";
import { BaseController } from "./BaseController";
import { Request} from 'express'
import * as md5 from 'md5';

export class ServiceProviderController extends BaseController<ServiceProvider> {

    constructor() {
        super(ServiceProvider, true);
    }

    private validationDefault(_serviceProvider : ServiceProvider): void{
        super.isRequired(_serviceProvider.name, 'O nome do fornecedor é obrigatório');
        super.isRequired(_serviceProvider.photo, 'A foto do fornecedor é obrigatória');
        super.isRequired(_serviceProvider.email, 'O email do fornecedor é obrigatório');
        super.isRequired(_serviceProvider.phone, 'O telefone do fornecedor é obrigatório');
        super.isRequired(_serviceProvider.categoriesCare, 'Informe as categorias atendidas');
        super.isRequired(_serviceProvider.citiesCare, 'Informe as cidades atendidas');
        super.isRequired(_serviceProvider.zipCode, 'O cep é obrigatório');
        super.isRequired(_serviceProvider.state, 'O estado é obrigatório');
        super.isRequired(_serviceProvider.password, 'A senha do fornecedor é obrigatório');
    }

    async save(request: Request) {
        let _serviceProvider = <ServiceProvider>request.body;
        this.validationDefault(_serviceProvider);
        return super.save(_serviceProvider, request);
    }

    async createServiceProvider(request:Request){
        let _serviceProvider = <ServiceProvider>request.body;
        let { confirmPassword } = request.body;
        this.validationDefault(_serviceProvider);
        super.isRequired(_serviceProvider.password, 'A senha é obrigatória');
        super.isRequired(confirmPassword, 'A confirmação de senha é obrigatória');
        super.isTrue(_serviceProvider.password !== confirmPassword, 'A senha e a confirmação de senha estão diferentes');

        if(_serviceProvider.password)
            _serviceProvider.password = md5(_serviceProvider.password);
        
        return super.save(_serviceProvider, request, true);
    }
}