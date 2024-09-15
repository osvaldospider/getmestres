import { RequestStatus } from "../entity/enum/RequestStatus";
import { RequestOrder } from "../entity/RequestOrder";
import { BaseController } from "./BaseController";
import { Request} from 'express'

export class RequestOrderController extends BaseController<RequestOrder> {

    constructor() {
        super(RequestOrder, false);
    }

    async save(request: Request) {
        let _requestOrder = <RequestOrder>request.body;
        super.isRequired(_requestOrder.title, 'Informe o título');
        super.isRequired(_requestOrder.description, 'Informe o que precisa');
        super.isRequired(_requestOrder.custumer, 'Preciso saber quem é você');
        super.isRequired(_requestOrder.longlat, 'Preciso saber onde você está');
        if(!_requestOrder.statusOrder){
            _requestOrder.statusOrder = RequestStatus.Pending;
        }
        return super.save(_requestOrder, request);
    }
}