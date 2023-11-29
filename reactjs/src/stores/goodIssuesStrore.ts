import { action, observable } from "mobx";
import { EntityDto } from "../services/dto/entityDto";
import GoodIssuesService from "../services/GoodIssues/GoodIssuesService";
import { CreateOrUpdateGoodIssuesInput, GetGoodIssuesOutput, PagedResultGooodsIssuesRequestDto, UpdateGoodIssuesInput } from "../services/GoodIssues/dto/GoodIssuesDto";
import { PagedResultDto } from "../services/dto/pagedResultDto";

class goodIssuesStore{
    @observable issues!: PagedResultDto<GetGoodIssuesOutput>
    @observable edit!: CreateOrUpdateGoodIssuesInput
    @observable editTransaction!: GetGoodIssuesOutput
    
    @action 
    async getAll(pagedFilterAndSortedRequest: PagedResultGooodsIssuesRequestDto){
        let result = await GoodIssuesService.getAll(pagedFilterAndSortedRequest)
        this.issues = result
    }
    @action
    async getTransactionById (entityDto: EntityDto){
        let result =  await GoodIssuesService.getTransactionById(entityDto);        
        this.editTransaction = result
    }

    @action 
    async create(create :CreateOrUpdateGoodIssuesInput){
        let result =  await GoodIssuesService.create(create);
        this.issues.items.push(result)
    }

    @action
    async update(update:UpdateGoodIssuesInput){
        let result =  await GoodIssuesService.update(update)
        this.issues.items = this.issues.items.map((x:GetGoodIssuesOutput) =>{
            if (x.id === update.id) {
                x= result;
            }  
            return x;
        })
    }

    @action
    async delete(entityDto: EntityDto) {
      await GoodIssuesService.delete(entityDto);
      this.issues.items = this.issues.items
        .filter((x: GetGoodIssuesOutput) => x.id !== entityDto.id)
    }  

    @action
    async get(entityDto: EntityDto){
        let result =  await GoodIssuesService.get(entityDto);
        this.edit = result
    }

    @action 
    async createIssues(){
        this.edit ={
            id: 0,
            issueQuantity: 0,
            isOnhandsProcessed:true,
            transactionID:0,
        }
    }
}

export default goodIssuesStore