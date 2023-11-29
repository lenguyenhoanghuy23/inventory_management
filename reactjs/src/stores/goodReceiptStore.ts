import { action, observable } from "mobx"
import { PagedResultDto } from "../services/dto/pagedResultDto"
import { CreateOrUpdateReceiptInput, GetGoodReceiptsOutput, UpdateReceiptInput , GetTransaction, updateIsCompleted, PagedResultGoodReceiptRequestDto } from "../services/GoodReceipts/dto/goodReceiptsDto"
import GoodReceiptsService from "../services/GoodReceipts/GoodReceiptsService"
import { EntityDto } from "../services/dto/entityDto"


class goodReceiptStore {
    @observable receipt!: PagedResultDto<GetGoodReceiptsOutput>
    @observable edit!: CreateOrUpdateReceiptInput
    @observable updateIsCompleted! :updateIsCompleted
    @observable getTransaction : GetTransaction[]=[]

    @action 
    async getAll(pagedFilterAndSortedRequest: PagedResultGoodReceiptRequestDto){
        let result = await GoodReceiptsService.getAll(pagedFilterAndSortedRequest)   
        this.receipt = result
    }

    @action
    async getTrans(){
        let result =  await GoodReceiptsService.getTransaction();
        this.getTransaction = result
    }

    @action 
    async create(create :CreateOrUpdateReceiptInput){
        let result =  await GoodReceiptsService.create(create);
        this.receipt.items.push(result)
    }

    @action
    async update(updateMTypeInput:UpdateReceiptInput){
        let result =  await GoodReceiptsService.update(updateMTypeInput)
        this.receipt.items = this.receipt.items.map((x:GetGoodReceiptsOutput) =>{
            if (x.id === updateMTypeInput.id) {
                x= result;
            }  
            return x;
        })
    }
    
    @action
    async updateIssues(update:updateIsCompleted){
        await GoodReceiptsService.updateIssues(update)
    }
    @action
    async updateTrans(update:updateIsCompleted){
        await GoodReceiptsService.updateTrans(update)
    }

    @action 
    async delete(entityDto : EntityDto){
        await GoodReceiptsService.delete(entityDto)
        this.receipt.items = this.receipt.items
            .filter( (x:GetGoodReceiptsOutput) =>  x.id !== entityDto.id )
    }   

    @action
    async get(entityDto: EntityDto){
        let result =  await GoodReceiptsService.get(entityDto);
        
        this.edit = result
    }

    @action 
    async createReceipt(){
        this.edit ={
            id: 0,
            transactionID: 0,
            organizationUnitId:0
        }
    }
    @action 
    async updateIsComplet(){
        this.updateIsCompleted ={
            id: 0,
            transactionId: 0,
        }
    }
}
export default goodReceiptStore