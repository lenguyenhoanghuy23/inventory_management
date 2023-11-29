import { action, observable } from "mobx"
import { PagedResultDto } from "../services/dto/pagedResultDto"
import {  GetAssigment, GetOrganization, GetType, PagedResultRequestDto, checkValidData, createOrUpdateTransactionInput, getTransactionOutput, update, updateTransactionInput } from "../services/MaterialTransaction/Dto/materialTransactionDto"
import materialTransactionService from "../services/MaterialTransaction/materialTransactionService"
import { EntityDto } from "../services/dto/entityDto"




class MaterialTransactionStore {
    @observable transaction!: PagedResultDto<getTransactionOutput>
    @observable edit!: update 
    @observable Type: GetType[] = []
    @observable Assignment: GetAssigment[] =[]
    @observable organization: GetOrganization[] = [];

    @action async getAll(pagedFilterAndSortedRequest: PagedResultRequestDto){
        let result = await materialTransactionService.getAll(pagedFilterAndSortedRequest)
        this.transaction = result
    }

    @action async get(entityDto:EntityDto){
        let result = await materialTransactionService.get(entityDto)
        this.edit =  result
    }
    @action async getType(){
        let result = await materialTransactionService.getType()
        this.Type =  result
    }
    public async getAssigment(pagedFilterAndSortedRequest: PagedResultRequestDto){
        let result = await materialTransactionService.getAssigment(pagedFilterAndSortedRequest)
        this.Assignment =  result
    }

    @action async create(create : createOrUpdateTransactionInput[]){
        let result = await materialTransactionService.create(create);
        this.transaction.items.push(result);   
    }

    @action async checkValidDate(checkVailData : checkValidData){
        let result = await materialTransactionService.checkVailData(checkVailData);
        console.log(result);
        // this.transaction.items.push(result);   
    }

    @action async update(update:updateTransactionInput){
        let result = await materialTransactionService.update(update);
        this.transaction.items= this.transaction.items.map((x:getTransactionOutput) =>{
            if (x.id == update.id) {
                x= result;
            }
            return x;
        })
    }

    @action
    async getOrganization() {
        let result = await materialTransactionService.getOrganization();
        console.log(result);
        
        this.organization = result;
    }
    @action async delete(entityDto:EntityDto){
        await materialTransactionService.delete(entityDto)
        this.transaction.items = this.transaction.items
            .filter((x:getTransactionOutput)=> x.id != entityDto.id)
    }

    @action async createTransaction (){
        this.edit = 
            {
                id: 0,
                transactionType: "",
                transactionQuantiry: 0,
                materialLot: "",
                materialNumber: "",
                fromPlant: "",
                fromSubLocation: "",
                toPlant:"",
                toSubLocation:"",
                docmentType: "",
                materialType:"",
                transactionNumber:"",
                isCompleted:true,

            }
        
    }
}

export default MaterialTransactionStore