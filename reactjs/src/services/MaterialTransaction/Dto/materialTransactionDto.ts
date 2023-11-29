import { PagedFilterAndSortedRequest } from '../../dto/pagedFilterAndSortedRequest';

export interface PagedResultRequestDto extends PagedFilterAndSortedRequest  {
    keyword: string,
    OrganizationUnitId : number,
}


export interface getAllTransactionInput {
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

export interface getTransactionOutput {
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

export interface createOrUpdateTransactionInput {
    id: number,
    transactionType: string,
    materialNumber: string,
    transactionQuantiry: 0,
    materialLot: string,
    fromPlant: string,
    fromSubLocation: string,
    toPlant: string,
    toSubLocation: string,
    docmentType: string
    organizationUnitId:number
}

export interface checkValidData {
    id: number,
    transactionType: string,
    materialNumber: string,
    transactionQuantiry: 0,
    materialLot: string,
    fromPlant: string,
    fromSubLocation: string,
    toPlant: string,
    toSubLocation: string,
    docmentType: string
}

export interface update{
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
    isCompleted: boolean
}

export interface updateTransactionInput {
    id: number,
    transactionNumber:string,
    transactionType: string,
    materialNumber: string,
    transactionQuantiry: number,
    materialLot: string,
    materialType: string,
    fromPlant: string,
    fromSubLocation: string,
    docmentType: string,
    isCompleted: boolean

}


export interface GetType{
    id: number
    transactionType: string,
    description: string
}

export interface GetAssigment{
    id:number,
    materialNumber: string,
    description: string,
    organizationUnitId:number,
}


export interface GetOrganization{
    id: number,
    displayName: string
    children: GetOrganization[]
  }