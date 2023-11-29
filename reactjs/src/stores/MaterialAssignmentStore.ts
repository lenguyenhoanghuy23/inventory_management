import { action, observable } from "mobx"
import { GetAllAssignmentOutput, createForAdmin, createInput } from "../services/materialAssignment/Dto/MaterialAssignmentDto"
import { PagedResultDto } from "../services/dto/pagedResultDto"
import MaterialAssignmentService from "../services/materialAssignment/MaterialAssignmentService"
import { PagedResultRequestDto } from "../services/PagedResultRequestDto"
import { EntityDto } from "../services/dto/entityDto"

class materialAssignmentStore{
    @observable Assignment!: PagedResultDto<GetAllAssignmentOutput>
    @observable edit!:createInput
    @observable editAssigment!:createForAdmin
    
    @action async getAll(pagedFilterAndSortedRequest: PagedResultRequestDto){
        let result = await MaterialAssignmentService.getAll(pagedFilterAndSortedRequest)
        this.Assignment = result;
    }

    @action
    async create(create : createInput){
        let result =  await MaterialAssignmentService.create(create)
        this.Assignment?.items?.push(result)
    }
    @action
    async createForAdmin(create : createForAdmin){
        let result =  await MaterialAssignmentService.createForAdmin(create)
        this.Assignment?.items?.push(result)
    }

    @action async delete(entityDto:EntityDto){
        await MaterialAssignmentService.delete(entityDto)
        this.Assignment.items = this.Assignment.items
            .filter((x:GetAllAssignmentOutput)=> x.id != entityDto.id)
    }

    async CreateAssigment(){
        this.editAssigment ={
            id:0,
            materialNumber:'',
            organizationUnitId:0
        }
    }
    async Create(){
        this.editAssigment ={
            id:0,
            materialNumber:'',
            organizationUnitId:0
        }
    }

}

export default materialAssignmentStore