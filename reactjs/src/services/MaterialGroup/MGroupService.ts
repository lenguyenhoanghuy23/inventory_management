import { EntityDto } from "../dto/entityDto";
import { PagedResultDto } from "../dto/pagedResultDto";
import http from "../httpService";
import {  GetAllMaterialGroup, UpdateMaterialGroupInput } from "./dto/MGroup";

class MGroupService {
    public async getAll():Promise<PagedResultDto<GetAllMaterialGroup>>{
        let result =  await http.get('api/services/app/MaterialGroup/GetAll');
        return result.data.result
    }
    public async get(entityDto:EntityDto){
        let result =  await http.get('api/services/app/MaterialGroup/Get',{params:entityDto})
        return result.data.result
    }
    public async create(create:UpdateMaterialGroupInput){
        let result = await http.post('api/services/app/MaterialGroup/Create',create);
        return result.data.result
    }
    public async update(upadte:UpdateMaterialGroupInput){
        let result = await http.put('api/services/app/MaterialGroup/Update',upadte);
        return result.data.result
    }
    public async delete(entityDto:EntityDto){
        let result = await http.delete('api/services/app/MaterialGroup/delete', {params:entityDto})
        return result.data.result
    }
}

export default new MGroupService()