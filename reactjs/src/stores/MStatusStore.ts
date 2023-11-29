
import { PagedResultDto } from "../services/dto/pagedResultDto"
import { GetMStatusOutput, CreateOrUpdateMStatusInput, PagedMStatusResultRequestDto, UpdateMStatusInput } from "../services/MaterialStatus/Dto/MStatusDto"
import { action, observable } from "mobx"

import { EntityDto } from "../services/dto/entityDto"

import MStatusService from "../services/MaterialStatus/MStatusService"

class MStatusStore {
    @observable mstatus!: PagedResultDto<GetMStatusOutput>
    @observable editMTStatus!: CreateOrUpdateMStatusInput  

    @action
    async getAll(pagedFilterAndSortedRequest:PagedMStatusResultRequestDto){
        let result = await MStatusService.getAll(pagedFilterAndSortedRequest)
        this.mstatus = result;
    }

    @action
    async get(entityDto: EntityDto){
        let result =  await MStatusService.get(entityDto);
        this.editMTStatus = result
    }

    @action
    async create(createMStatusInput:CreateOrUpdateMStatusInput){
        let result = await MStatusService.create(createMStatusInput)
        this.mstatus.items.push(result);

    }
    @action
    async update(updateMStatusInput:UpdateMStatusInput){
        let result = await MStatusService.update(updateMStatusInput)
        this.mstatus.items = this.mstatus.items.map((x:GetMStatusOutput) =>{
            if (x.id === updateMStatusInput.id) {
                x= result;
            }
            return x;
        })
    }


    @action
    async delete(entityDto :EntityDto){
        await MStatusService.delete(entityDto)
        this.mstatus.items = this.mstatus.items
                    .filter((x: GetMStatusOutput) => x.id !== entityDto.id)
    }   

    
    @action
    async CreateMStatus(){
        this.editMTStatus ={
            id:0,
            materialStatus:null,
            description:""
        }
    }
}

export default MStatusStore