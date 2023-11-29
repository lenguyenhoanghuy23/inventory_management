import { EntityDto } from "../dto/entityDto";
import { PagedResultDto } from "../dto/pagedResultDto";
import http from "../httpService";
import { CreateOrUpdateMStatusInput, GetAllMStatusOutput, PagedMStatusResultRequestDto, UpdateMStatusInput } from "./Dto/MStatusDto";

class MStatusService{
    public async getAll(pagedFilterAndSortedRequest: PagedMStatusResultRequestDto):Promise<PagedResultDto<GetAllMStatusOutput>>{
        let result =  await http.get('api/services/app/MaterialStatus/GetAll', {params: pagedFilterAndSortedRequest});
        return result.data.result
    }
    public async get(entityDto:EntityDto): Promise<CreateOrUpdateMStatusInput>{
        let result =  await http.get('api/services/app/MaterialStatus/Get', {params:entityDto});
        return result.data.result
    }
    public async create(createMStatusInput: CreateOrUpdateMStatusInput){
        let result = await http.post('api/services/app/MaterialStatus/Create', createMStatusInput);
        return result.data.result
    }

    public async update(updateMStatusInput:UpdateMStatusInput ){
        let result = await http.put('api/services/app/MaterialStatus/Update', updateMStatusInput);
        return result.data.result;
    }
    public async delete(entityDto :EntityDto){
        let result = await http.delete('api/services/app/MaterialStatus/Delete', {params:entityDto})
        return result.data.result
    }

}

export default new MStatusService()