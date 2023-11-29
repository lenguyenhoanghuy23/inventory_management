import { action, observable } from "mobx";

import MaterialIventoryService from "../services/MaterialInventory/MaterialIventoryService";
import { PagedResultRequestDto } from "../services/PagedResultRequestDto";
import { CreateInventoryInput, GetAllInventoryOutput, PagedResultInventoryRequestDto, getTransaction } from "../services/MaterialInventory/Dto/MaterialInventoryDto";
import { PagedResultDto } from "../services/dto/pagedResultDto";

class materialIventoryStore{
    @observable inventory!: PagedResultDto<GetAllInventoryOutput>
    @observable edit!: CreateInventoryInput 
    @observable Transaction: getTransaction[] =[]

    @action async getAll(pagedFilterAndSortedRequest: PagedResultInventoryRequestDto){
        let result = await MaterialIventoryService.getAll(pagedFilterAndSortedRequest)
        this.inventory = result
    }


    @action async getAllTransaction(pagedFilterAndSortedRequest: PagedResultRequestDto){
        let result = await MaterialIventoryService.getAllTransaction(pagedFilterAndSortedRequest)
        this.Transaction = result
    }

    @action async create(createInventoryInput : CreateInventoryInput){
        let result = await MaterialIventoryService.create(createInventoryInput);
        this.inventory.items.push(result);   
    }

    @action async createIventory (){
        this.edit = 
            {
                id: 0,
                materialNumber:"",
                fromPlant:"",
                toPlant:"",
                type:"",
                organizationUnitId:0,
            }

    }
}

export default materialIventoryStore