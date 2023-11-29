import { EntityDto } from "../dto/entityDto";
import { PagedResultDto } from "../dto/pagedResultDto";
import http from "../httpService"
import {UpdateMasterDataInput, PagedMasterDataResultRequestDto , CreateOrUpdateMasterData , GetAllMasterData} from "./Dto/MasterDataDto";

class MaterialMasterData {
    public async getAll(pagedFilterAndSortedRequest: PagedMasterDataResultRequestDto):Promise<PagedResultDto<GetAllMasterData>>{
        let result = await http.get('api/services/app/MaterialMasterData/GetAll',{params:pagedFilterAndSortedRequest});
        return result.data.result
    }
    public async get(entityDto:EntityDto){
        let result = await http.get('api/services/app/MaterialMasterData/Get', {params:entityDto})
        return result.data.result
    }

    public async getType(){
        let result = await http.get('api/services/app/MaterialType/GetAll');
        return result.data.result.items
    }
    public async getStatus(){
        let result = await http.get('api/services/app/MaterialStatus/GetAll');
        return result.data.result.items
    }

    public async getOrganization() {
        let result = await http.get('api/services/app/OrganizationUnit/GetAll');
        return result.data.result.items;
    }
    
    public async getMGroup(){
        let result =  await http.get('api/services/app/MaterialGroup/GetAll');
        return result.data.result.items
    }

    public async create(createMasterDataInput: CreateOrUpdateMasterData){
            let result = await http.post('api/services/app/MaterialMasterData/Create', createMasterDataInput)
            return result.data.result
    }

    public  async  ImportExcel(file:File) {
        const formData = new FormData();
        formData.append("file",file);
        let result = await http.post('api/services/app/MaterialMasterData/ImportExcel' , formData)
        return result.data.result
    }
    
    public async update(UpdateInput:UpdateMasterDataInput){
        let result = await http.put('api/services/app/MaterialMasterData/Update', UpdateInput)
        return result.data.result
    }
    public async detele(entityDto:EntityDto){
        let result = await http.delete('api/services/app/MaterialMasterData/Delete', {params:entityDto})
        return result.data.result
    }   
}


export default new MaterialMasterData()