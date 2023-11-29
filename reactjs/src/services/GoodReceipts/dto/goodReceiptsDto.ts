import { PagedFilterAndSortedRequest } from "../../dto/pagedFilterAndSortedRequest"

export interface PagedResultGoodReceiptRequestDto extends PagedFilterAndSortedRequest  {
    keyword: string
    toPlant:string
}


export interface GetAllGoodReceipts{
    id: number,
    transactionNumber: string,
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
    total: number,
    isCompleted: true,
    children: [
      {
        id:number,
        receiptType: string,
        transaction: string,
        transtiomId: number,
        receiptQuantity: number,
        materialNumber: string,
        materialType: string,
        materialLot: string,
        plant: string,
        subLocation: string,
        isOnhandsProcessed: boolean
      }
    ]
}

export interface GetGoodReceiptsOutput{
    id: number,
    transactionNumber: string,
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
    total: number,
    isCompleted: true,
    children: [
      {
        id:number,
        receiptType: string,
        transaction: string,
        transtiomId: number,
        receiptQuantity: number,
        materialNumber: string,
        materialType: string,
        materialLot: string,
        plant: string,
        subLocation: string,
        isOnhandsProcessed: boolean
      }
    ]
}

export interface CreateOrUpdateReceiptInput{
    id: number,
    transactionID: number,
    organizationUnitId:number
}

export interface UpdateReceiptInput{
    id: number,
    receiptType: string,
    transaction: number,
    receiptQuantity: number,
    
}

export interface updateIsCompleted{
    id:number;
    transactionId: number;
}

export interface GetTransaction{
    id: number,
    transactionNumber: string,
}