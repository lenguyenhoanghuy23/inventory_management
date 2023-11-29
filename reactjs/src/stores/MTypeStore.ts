import { action, observable } from "mobx"
import { PagedResultDto } from "../services/dto/pagedResultDto"
import { CreateOrUpdateInput, CreateOrUpdateMTypeInput, GetMTypeOutput, PagedMTypeResultRequestDto, UpdateMTypeInput } from "../services/materialType/Dto/MTypeDto"


import MTypeService from "../services/materialType/MTypeService"
import { EntityDto } from "../services/dto/entityDto"

class MTypeStore {
    @observable mtype!: PagedResultDto<GetMTypeOutput> 
    @observable editmtype!: CreateOrUpdateMTypeInput


    @action 
    async getAll(pagedFilterAndSortedRequest:PagedMTypeResultRequestDto ){
        let result = await MTypeService.getAll(pagedFilterAndSortedRequest) 
        this.mtype = result
    }

    @action 
    async create(createOrUpdateInput :CreateOrUpdateInput){
        let result =  await MTypeService.create(createOrUpdateInput);
        this.mtype.items.push(result)
    }

    @action
    async update(updateMTypeInput:UpdateMTypeInput){
        let result =  await MTypeService.update(updateMTypeInput)
        this.mtype.items = this.mtype.items.map((x:GetMTypeOutput) =>{
            if (x.id === updateMTypeInput.id) {
                x= result;
            }  
            return x;
        })
    }


    @action
    async delete(entityDto: EntityDto) {
        await MTypeService.delete(entityDto);
        this.mtype.items = this.mtype.items
            .filter((x: GetMTypeOutput) => x.id !== entityDto.id)
    }
    @action
    async get(entityDto: EntityDto){
        let result =  await MTypeService.get(entityDto);
        
        this.editmtype = result
    }

    @action 
    async createMType(){
        this.editmtype ={
            id : 0,
            materialTypes :'',
            description:'',
        }
    }
}

export default MTypeStore