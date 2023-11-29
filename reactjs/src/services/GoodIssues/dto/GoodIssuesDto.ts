import { PagedFilterAndSortedRequest } from "../../dto/pagedFilterAndSortedRequest"

export interface PagedResultGooodsIssuesRequestDto extends PagedFilterAndSortedRequest  {
  keyword: string
  FromPlant:string
}


export interface GetAllGoodIssues{
    id: number,
    transactionNumber: string,
    transactionType: string,
    materialNumber: string,
    transactionQuantiry:number,
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
          id: number,
          transtiomId: number,
          issuesType: string,
          transaction: string,
          issueQuantity: 0,
          materialNumber: string,
          materialType: string,
          materialLot: string,
          plant: string,
          subLocation: string,
          isOnhandsProcessed: true
        }
      ]
}


export interface GetGoodIssuesOutput{
    id: number,
    transactionNumber: string,
    transactionType: string,
    materialNumber: string,
    transactionQuantiry:number,
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
          id: number,
          transtiomId: number,
          issuesType: string,
          transaction: string,
          issueQuantity: 0,
          materialNumber: string,
          materialType: string,
          materialLot: string,
          plant: string,
          subLocation: string,
          isOnhandsProcessed: true
        }
      ]
}

export interface CreateOrUpdateGoodIssuesInput{
    id:number
    transactionID: number,
    isOnhandsProcessed: boolean
    issueQuantity: number
}

export interface UpdateGoodIssuesInput{
    id:number,
    issueQuantity: number,
    
}


