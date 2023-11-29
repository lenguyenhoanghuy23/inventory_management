import { PagedResultRequestDto } from "../PagedResultRequestDto"
import RequestMethods from "../RequestMethods"
import { EntityDto } from "../dto/entityDto"




import { CreateOrUpdatePlantInput, UpdatePlantInput, getAllMaterialPlant } from "./dto/MaterialPlantDto"


class  materialPlantServer {
    public async getAll(pagedResultRequestDto: PagedResultRequestDto){
        return await RequestMethods.getAll<getAllMaterialPlant>("MaterialPlant" ,pagedResultRequestDto)
    }

    public async get(entityDto:EntityDto){
        return await RequestMethods.get<EntityDto>("MaterialPlant",entityDto)

       
    }

    public async create(createOrUpdatePlantInput:CreateOrUpdatePlantInput){
        return await RequestMethods.create<CreateOrUpdatePlantInput>("MaterialPlant",createOrUpdatePlantInput)
    }

    public async update(update:UpdatePlantInput){
        return await RequestMethods.update<UpdatePlantInput>("MaterialPlant" , update)
    }

    public async delete(entityDto:EntityDto){
        return await RequestMethods.delete<EntityDto>("MaterialPlant",entityDto)
    }

}

export default new materialPlantServer