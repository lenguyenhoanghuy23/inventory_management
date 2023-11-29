
import { EntityDto } from "../dto/entityDto";
import { PagedResultDto } from "../dto/pagedResultDto";
import http from "../httpService";
import { CreateOrUpdateGoodIssuesInput, GetAllGoodIssues, PagedResultGooodsIssuesRequestDto, UpdateGoodIssuesInput, } from "./dto/GoodIssuesDto";

class GoodIssuesService {
    public async getAll(pagedFilterAndSortedRequest: PagedResultGooodsIssuesRequestDto):Promise<PagedResultDto<GetAllGoodIssues>>{
        let result = await http.get('/api/services/app/GoodIssues/GetGoodIssues',{params:pagedFilterAndSortedRequest});
        return result.data.result
    }

    public async get(entityDto:EntityDto){
        let result = await http.get('api/services/app/GoodIssues/Get',{params:entityDto})
        return result.data.result
    }

    public async getTransactionById (entityDto:EntityDto){
        let result = await http.get('api/services/app/GoodIssues/GetTransactionById',{params:entityDto})
        return result.data.result
    }
    
    public async getTransaction (){
        let result = await http.get('api/services/app/MaterialTransaction/Get')
        return result.data.result.items
    } 

    public async create(create:CreateOrUpdateGoodIssuesInput){
        let result = await http.post('api/services/app/GoodIssues/Create',create)
        return  result.data.result
    }
    public async update(update:UpdateGoodIssuesInput){
        let result = await http.put('api/services/app/GoodIssues/Update',update)
        return  result.data.result
    }
    
    public async delete(entityDto:EntityDto){
        let result = await http.delete('api/services/app/GoodIssues/Delete',{params:entityDto})
        return  result.data.result
    }
}
export default new GoodIssuesService()