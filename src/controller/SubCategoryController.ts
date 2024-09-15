import { SubCategory } from "../entity/SubCategory";
import { BaseController } from "./BaseController";
import { Request} from 'express'

export class SubCategoryController extends BaseController<SubCategory> {

    constructor() {
        super(SubCategory, true);
    }

    async save(request: Request) {
        let _subCategory = <SubCategory>request.body;
        super.isRequired(_subCategory.name, 'O nome da SubCategoria é obrigatório');
        super.isRequired(_subCategory.category, 'A categoria é obrigatória');
        super.isRequired(_subCategory.cost, 'O custo é obrigatório');
        super.isTrue(isNaN(_subCategory.cost), 'O custo deve ser um número');
        super.isTrue(_subCategory.cost < 0, 'O custo deve ser maior que zero');
        return super.save(_subCategory, request);
    }
}