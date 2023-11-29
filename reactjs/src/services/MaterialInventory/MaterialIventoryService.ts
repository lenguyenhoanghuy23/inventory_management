import { PagedResultRequestDto } from "../PagedResultRequestDto";
import { PagedResultDto } from "../dto/pagedResultDto";
import http from "../httpService";
import {  CreateInventoryInput, GetAllInventoryInputput, PagedResultInventoryRequestDto } from "./Dto/MaterialInventoryDto";

class MaterialIventoryService {
    public async getAll(pagedFilterAndSortedRequest: PagedResultInventoryRequestDto):Promise<PagedResultDto<GetAllInventoryInputput>>{ 
        let result = await http.get('/api/services/app/inventory/GetAll', { params: pagedFilterAndSortedRequest });
        return result.data.result
    }

    public async getAllTransaction(pagedFilterAndSortedRequest: PagedResultRequestDto){
        let result = await http.get('api/services/app/MaterialTransaction/GetAll', { params: pagedFilterAndSortedRequest });
        return result.data.result.items
    }

    public async create(createInventoryInput:  CreateInventoryInput){
        let result = await http.post('/api/services/app/inventory/Create', createInventoryInput)
        return result.data.result
    }
}

export default new MaterialIventoryService()