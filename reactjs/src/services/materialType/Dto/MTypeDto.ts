import { PagedFilterAndSortedRequest } from "../../dto/pagedFilterAndSortedRequest"




export interface PagedMTypeResultRequestDto extends PagedFilterAndSortedRequest {
    keyword: string
}

export interface GetAllMTypeOutput{
    id:number
    materialTypes: string,
    description: string
}

export interface GetMTypeOutput{
    id:number
    materialTypes: string,
    description: string
}

export interface CreateOrUpdateMTypeInput{
    id:number
    materialTypes: string,
    description: string
}


export interface CreateOrUpdateInput{
    id:number
    materialTypes: string,
    description: string
}

export interface UpdateMTypeInput{
    id:number
    materialTypes: string,
    description: string
}
