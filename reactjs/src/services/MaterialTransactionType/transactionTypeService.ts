
import { EntityDto } from "../dto/entityDto";
import { PagedResultDto } from "../dto/pagedResultDto";
import http from "../httpService"
import {  CreateOrUpdateTransactionTypeInput, GetAllTransactionType, UpdateTransactionTypeInput} from "./Dto/transactionTypeDto";

class transactionTypeService {
    public async getAll():Promise<PagedResultDto<GetAllTransactionType>>{
        let result = await http.get('api/services/app/TransactionsType/GetAll')
        return result.data.result 
    }
    public async Get(entityDto:EntityDto){
        let result = await http.get('api/services/app/TransactionsType/Get',{params :entityDto})

        return result.data.result
    }
    
    public async Create(createInput:CreateOrUpdateTransactionTypeInput){
        let result = await http.post('api/services/app/TransactionsType/Create', createInput)
        return result.data.result
    }

    public async Update(updateInput:UpdateTransactionTypeInput){
        let result = await http.put('api/services/app/TransactionsType/Update', updateInput)
        return result.data.result
    }
    public async Delete(entityDto:EntityDto){
        let result = await http.delete('api/services/app/TransactionsType/Delete',{params:entityDto})
        return  result.data.result
    }
}

export default new transactionTypeService()