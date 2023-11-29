import { action, observable } from "mobx";
import { PagedResultDto } from "../services/dto/pagedResultDto";
import { CreateOrUpdateMaterialGroupInput, GetMaterialGroupOutput, UpdateMaterialGroupInput } from "../services/MaterialGroup/dto/MGroup";
import { EntityDto } from "../services/dto/entityDto";
import MGroupService from "../services/MaterialGroup/MGroupService";

class materialGroupStore {
    @observable mGroup!: PagedResultDto<GetMaterialGroupOutput>
    @observable edit!: CreateOrUpdateMaterialGroupInput
    @action async getAll(){
        let result = await MGroupService.getAll()
        console.log(result);
        this.mGroup = result;
    }
    @action async get(entityDto: EntityDto){
        let result =  await MGroupService.get(entityDto);
        this.edit = result
    }
    @action async create(create:CreateOrUpdateMaterialGroupInput){
        let result = await MGroupService.create(create)
        this.mGroup.items.push(result);
    }
    @action async update(update:UpdateMaterialGroupInput){
        let result = await MGroupService.update(update)
        this.mGroup.items = this.mGroup.items.map((x:GetMaterialGroupOutput) =>{
            if (x.id === update.id) {
                x= result;
            }
            return x;
        })
    }
    @action
    async delete(entityDto :EntityDto){
        await MGroupService.delete(entityDto)
        this.mGroup.items = this.mGroup.items
                    .filter((x: GetMaterialGroupOutput) => x.id !== entityDto.id)
    }   
    @action
    async CreateMaterialGroup(){
        this.edit ={
            id:0,
            materialGroup:"",
            description:""
        }
    }
}


export default materialGroupStore