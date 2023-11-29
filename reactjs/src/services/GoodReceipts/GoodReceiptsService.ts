
import { EntityDto } from "../dto/entityDto";
import { PagedResultDto } from "../dto/pagedResultDto";

import http from "../httpService";
import { CreateOrUpdateReceiptInput, GetAllGoodReceipts, PagedResultGoodReceiptRequestDto, UpdateReceiptInput, updateIsCompleted } from "./dto/goodReceiptsDto";

class GoodReceiptsService {
    public async getAll(pagedFilterAndSortedRequest: PagedResultGoodReceiptRequestDto):Promise<PagedResultDto<GetAllGoodReceipts>>{
        let result = await http.get('api/services/app/GoodReceipts/GetGoodReceipt',{params:pagedFilterAndSortedRequest});
        return result.data.result
    }

    public async get(entityDto:EntityDto){
        let result = await http.get('api/services/app/GoodReceipts/Get',{params:entityDto})
        return result.data.result
    }

    public async getTransaction (){
        let result = await http.get('api/services/app/MaterialTransaction/GetAll')
        return result.data.result.items
    } 

    public async create(create:CreateOrUpdateReceiptInput){
        let result = await http.post('api/services/app/GoodReceipts/Create',create)
        return  result.data.result
    }
    public async update(update:UpdateReceiptInput){
        let result = await http.put('api/services/app/GoodReceipts/Update',update)
        return  result.data.result
    }

    public async updateTrans(transID:updateIsCompleted){
        let result = await http.put('api/services/app/MaterialTransaction/updateIsCompleted',transID)
        return  result.data.result
    }

    public async updateIssues(transID:updateIsCompleted){      
        let result = await http.put('api/services/app/GoodIssues/updateIsOnhandsProcessed',transID)
        return  result.data.result
    }
    public async delete(entityDto:EntityDto){
        let result = await http.delete('api/services/app/GoodReceipts/Delete',{params:entityDto})
        return  result.data.result
    }
}


export default new GoodReceiptsService()