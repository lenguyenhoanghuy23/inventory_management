import { action, observable } from "mobx";
import { PagedResultDto } from "../services/dto/pagedResultDto";
import { createOUInput, UpdateOUInput, getOrganizationUnitOutput } from "../services/organization/dto/organizationDto";
import organizationService from "../services/organization/organizationService";
import { EntityDto } from "../services/dto/entityDto";

class organizationUnitStore {
    @observable orgUnit! : PagedResultDto<getOrganizationUnitOutput>
    @observable edit! : createOUInput


    @action 
    async getAll (){
        let result = await organizationService.getAll()
        this.orgUnit = result
    }

    @action 
    async create(createOrUpdateInput :createOUInput){
        let result =  await organizationService.create(createOrUpdateInput);
        this.orgUnit.items.push(result)
    }

    @action
    async update(updateorgUnitInput:UpdateOUInput){
        await organizationService.update(updateorgUnitInput)
    }

    @action 
    async delete(entityDto : EntityDto){
        await organizationService.delete(entityDto)
    }   

    @action
    async get(entityDto: EntityDto){
        let result =  await organizationService.get(entityDto);
        
        this.edit = result
    }

    @action 
    async createOU(){
        this.edit ={
            id : 0,
            displayName :'',
            parentId:0,
        }
    }

}

export default organizationUnitStore