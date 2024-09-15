import { QuestionType } from "../entity/enum/QuestionType";
import { Question } from "../entity/Question";
import { BaseController } from "./BaseController";
import { Request} from 'express'

export class QuestionController extends BaseController<Question> {

    constructor() {
        super(Question, true);
    }

    async save(request: Request) {
        let _question = <Question>request.body;
        super.isRequired(_question.question, 'A pergunta é obrigatória');
        super.isRequired(_question.type, 'O tipo é obrigatório');
        super.isRequired(_question.subCategory, 'A SubCategoria é obrigatória');

        if(_question.type && parseInt(_question.type.toString()) === QuestionType.Select){
            super.isRequired(_question.options, 'Para o tipo Selecione você deve informar quais são as opções');
        }
        return super.save(_question, request);
    }
}