import { EntityDto } from "../dto/entityDto"
import { PagedResultDto } from "../dto/pagedResultDto"
import http from "../httpService"

import { CreateOrUpdateInput, GetAllMTypeOutput, PagedMTypeResultRequestDto, UpdateMTypeInput } from "./Dto/MTypeDto"

class MTypeService {
    async getAll(pagedFilterAndSortedRequest :PagedMTypeResultRequestDto ): Promise<PagedResultDto<GetAllMTypeOutput>>{
        let result =  await http.get('api/services/app/MaterialType/GetAll', {params: pagedFilterAndSortedRequest})
        return result.data.result
    }

    public async get(entityDto: EntityDto): Promise<CreateOrUpdateInput> {
        let result = await http.get('api/services/app/MaterialType/Get', { params: entityDto });
        return result.data.result;
    }

    public async create(createInput :CreateOrUpdateInput ){
        let result =  await http.post('api/services/app/MaterialType/Create', createInput);
        return  result.data.result
    } 

    public async update(updateInput:UpdateMTypeInput){
        let result =  await http.put('api/services/app/MaterialType/Update',updateInput)
        return result.data.result
    }

    public async delete (entityDto:EntityDto){
        let result = await http.delete('api/services/app/MaterialType/Delete',{params: entityDto})
        return result.data;
    }
}

export default new MTypeService();