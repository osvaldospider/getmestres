import { RequestStatus } from "../entity/enum/RequestStatus";
import { RequestAnswers } from "../entity/RequestAnswers";
import { BaseController } from "./BaseController";
import { Request} from 'express'

export class RequestAnswersController extends BaseController<RequestAnswers> {

    constructor() {
        super(RequestAnswers, false);
    }

    async all(request:Request){
        let { orderUid } = request.params;
        if(!orderUid) return {
            status: 400, message: 'Informe o código da requisição'
        }

        this.repostitory.find({
            where:{
                requestOrder : orderUid
            }
        })
            
        
    }

    async save(request: Request) {
        let _requestAnswers = <RequestAnswers>request.body;

        super.isRequired(_requestAnswers.answer, 'Informe a resposta da pergunta');
        super.isRequired(_requestAnswers.question, 'A questão precisa ser informada');
        super.isRequired(_requestAnswers.requestOrder, 'Informe a requisição');
        return super.save(_requestAnswers, request);
    }
}