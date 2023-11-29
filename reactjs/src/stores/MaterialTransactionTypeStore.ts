import { action, observable } from "mobx"
import { PagedResultDto } from "../services/dto/pagedResultDto"
import { CreateOrUpdateTransactionTypeInput, GetTransactionTypeOutput ,UpdateTransactionTypeInput} from "../services/MaterialTransactionType/Dto/transactionTypeDto"
import transactionTypeService from "../services/MaterialTransactionType/transactionTypeService"
import { EntityDto } from "../services/dto/entityDto"

class MaterialTransactionTypeStore{
    @observable TransactionType !:PagedResultDto<GetTransactionTypeOutput>
    @observable editTransactionType!: CreateOrUpdateTransactionTypeInput 
    @observable ExcelFile!:File

    @action async getAll(){
        let result = await transactionTypeService.getAll();
        this.TransactionType = result
    }


    @action async get(entityDto:EntityDto){
        let result = await transactionTypeService.Get(entityDto)
        this.editTransactionType =  result;
    }

    @action async create(createInput:CreateOrUpdateTransactionTypeInput){
        let result = await transactionTypeService.Create(createInput)
        this.TransactionType.items.push(result);
    }

    @action async update(updateInput:UpdateTransactionTypeInput){
        let result = await transactionTypeService.Update(updateInput)
        this.TransactionType.items= this.TransactionType.items.map((x:GetTransactionTypeOutput) =>{
            if (x.id == updateInput.id) {
                x= result;
            }
            return x;
        })
    }
    
    @action
    async delete (entityDto:EntityDto){
        await transactionTypeService.Delete(entityDto)
        this.TransactionType.items = this.TransactionType.items
            .filter((x:GetTransactionTypeOutput)=> x.id != entityDto.id)
    }


    @action 
    async CreateTransactionType(){
        this.editTransactionType={
            description:"",
            transactionType:"",
            id:0
        }
    }

}


export default MaterialTransactionTypeStore