import { PagedResultRequestDto } from "../PagedResultRequestDto";
import { EntityDto } from "../dto/entityDto";
import { PagedResultDto } from "../dto/pagedResultDto";
import http from "../httpService";
import { GetAllAssignmentInput, createForAdmin, createInput } from "./Dto/MaterialAssignmentDto";


class MaterialAssignmentService{
    public async getAll(pagedFilterAndSortedRequest: PagedResultRequestDto):Promise<PagedResultDto<GetAllAssignmentInput>>{ 
        let result = await http.get('/api/services/app/MaterialAssignment/GetAll', { params: pagedFilterAndSortedRequest });
        return result.data.result
    }

    public async createForAdmin(create: createForAdmin){ 
        let result = await http.post('api/services/app/MaterialAssignment/CreateAsyncForAdmin', create);
        return result.data.result
    }
    public async create(create: createInput){ 
        let result = await http.post('api/services/app/MaterialAssignment/Create', create);
        return result.data.result
    }


    public async delete(entityDto: EntityDto){ 
        let result = await http.delete('api/services/app/MaterialAssignment/Delete', { params:entityDto});
        return result.data.result
    }
}

export default new MaterialAssignmentService()