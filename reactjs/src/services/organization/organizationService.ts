import { EntityDto } from "../dto/entityDto";
import { PagedResultDto } from "../dto/pagedResultDto";
import http from "../httpService";
import { createOUInput, UpdateOUInput, getAllOrganizationUnit } from "./dto/organizationDto";

class OrganizationUnitService {
    public async getAll():Promise<PagedResultDto<getAllOrganizationUnit>>{
        let result = await http.get('api/services/app/OrganizationUnit/GetAll');
        return result.data.result
    }
    public async get(entityDto:EntityDto){
        let result = await http.get('api/services/app/OrganizationUnit/Get',{params:entityDto})
        return result.data.result
    }
    public async create(create:createOUInput){
        let result = await http.post('api/services/app/OrganizationUnit/Create',create)
        return result.data.result
    }
    public async update(update:UpdateOUInput){
        let result = await http.put('api/services/app/OrganizationUnit/Update',update)
        return result.data.result
    }

    public async delete(entityDto:EntityDto){
        let result = await http.delete('api/services/app/OrganizationUnit/Delete',{params:entityDto})
        return result.data.result
    }
}
export default new OrganizationUnitService()