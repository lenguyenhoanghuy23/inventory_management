import { EntityDto } from "../dto/entityDto";
import { PagedResultDto } from "../dto/pagedResultDto";
import http from "../httpService";
import { PagedResultRequestDto, checkValidData, createOrUpdateTransactionInput, getAllTransactionInput, updateTransactionInput } from "./Dto/materialTransactionDto";

class materialTransactionService {
    
    public async getAll(pagedFilterAndSortedRequest: PagedResultRequestDto):Promise<PagedResultDto<getAllTransactionInput>>{
        let result = await http.get('api/services/app/MaterialTransaction/GetAll', { params: pagedFilterAndSortedRequest });
        return result.data.result
    }

    public async get(entityDto:EntityDto){
        let result = await http.get('api/services/app/MaterialTransaction/Get',{params:entityDto})
        return result.data.result
    }

    public async getType(){
        let result = await http.get('api/services/app/TransactionsType/GetAll')
        return result.data.result.items
    }

    public async getGroup(){
        let result = await http.get('api/services/app/TransactionGroup/GetAll')
        return result.data.result.items
    }
    public async getOrganization() {
        let result = await http.get('api/services/app/OrganizationUnit/GetAll');
        return result.data.result.items;
    }
      

    public async getAssigment(pagedFilterAndSortedRequest: PagedResultRequestDto){
        let result = await http.get('/api/services/app/MaterialAssignment/GetAll' , { params: pagedFilterAndSortedRequest });
        return result.data.result.items
    }

    public async create(createInput:  createOrUpdateTransactionInput[]){
        let result = await http.post('api/services/app/MaterialTransaction/CreateList', createInput)
        return result.data.result
    }


    public async checkVailData (checkVailData:checkValidData){
        let result =  await http.post("/api/services/app/MaterialTransaction/checkValidData" ,checkVailData)
        return result.data.result
    }


    public async update(updateInput:updateTransactionInput){
        let result = await http.put('api/services/app/MaterialTransaction/Update',updateInput)
        return result.data.result
    }
    public async delete(entityDto:EntityDto){
        let result = await http.delete('api/services/app/MaterialTransaction/Delete',{params : entityDto})
        return result.data.result
    }
}

export default new materialTransactionService()