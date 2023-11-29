import { PagedFilterAndSortedRequest } from "../../dto/pagedFilterAndSortedRequest"

export interface PagedResultInventoryRequestDto extends PagedFilterAndSortedRequest  {
    keyword: string
    OrganizationUnitId :number
}


export interface GetAllInventoryInputput {
    id:number,
    materialNumber: string,
    materialType: string,
    inventoryQuantity: 0,
    materialLot: string,
    plant: string,
    subLocation: string
}
export interface GetAllInventoryOutput {
    id:number,
    materialNumber: string,
    materialType: string,
    inventoryQuantity: 0,
    materialLot: string,
    plant: string,
    subLocation: string
}
export interface CreateInventoryInput {
    id:number,
    materialNumber: string,
    type:string,
    fromPlant:string,
    toPlant:string,
    organizationUnitId:number,
}

export interface getTransaction {
    id: number,
    transactionNumber:string,
    transactionType: string,
    materialNumber: string,
    transactionQuantiry: number,
    materialLot: string,
    materialType: string,
    fromPlant: string,
    fromSubLocation: string,
    toPlant: string,
    toSubLocation: string,
    docmentType: string,
    total:number,
    isCompleted: boolean
}