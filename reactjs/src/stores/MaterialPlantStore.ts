import { action, observable } from "mobx";
import { PagedResultDto } from "../services/dto/pagedResultDto";
import { CreateOrUpdatePlantInput, getAllMaterialPlantOutput  , UpdatePlantInput} from "../services/materialPlant/dto/MaterialPlantDto";
import materialPlantService from "../services/materialPlant/materialPlantService";
import { PagedResultRequestDto } from "../services/PagedResultRequestDto";
import { EntityDto } from "../services/dto/entityDto";


class MaterialPlantStore{
    @observable plant!: PagedResultDto<getAllMaterialPlantOutput>;

    @observable edit!: CreateOrUpdatePlantInput

    @action
    async getAll(pagedFilterAndSortedRequest: PagedResultRequestDto) {
        let result = await materialPlantService.getAll(pagedFilterAndSortedRequest);
        
        
        this.plant = result;
    }

    @action
    async get(entityDto: EntityDto){
        let result =  await materialPlantService.get(entityDto);
        this.edit = result
    }

    @action 
    async create(createOrUpdatePlantInput:CreateOrUpdatePlantInput){
        let result = await materialPlantService.create(createOrUpdatePlantInput)
        this.plant.items.push(result)
    }

    @action
    async update(updateMStatusInput:UpdatePlantInput){
        let result = await materialPlantService.update(updateMStatusInput)
        this.plant.items = this.plant.items.map((x:getAllMaterialPlantOutput) =>{
            if (x.id === updateMStatusInput.id) {
                x= result;
            }
            return x;
        })
    }

    @action
    async delete(entityDto :EntityDto){
        await materialPlantService.delete(entityDto)
        this.plant.items = this.plant.items
                    .filter((x: getAllMaterialPlantOutput) => x.id !== entityDto.id)
    } 

    @action 
    async createPlant (){
        this.edit ={
            id:0,
            plantName:"",
            description:""
        }
    }
    
}

export default MaterialPlantStore