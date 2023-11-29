import { PagedFilterAndSortedRequest } from "../../dto/pagedFilterAndSortedRequest";

export interface PagedMStatusResultRequestDto extends PagedFilterAndSortedRequest{
    keyword: string
}

export interface GetAllMStatusOutput {
    id :number,
    materialStatus: number,
    description: string
}

export interface CreateOrUpdateMStatusInput {
    id :number,
    materialStatus: number | null,
    description: string
}
export interface UpdateMStatusInput {
    id :number,
    materialStatus: number,
    description: string
}
export interface GetMStatusOutput {
    id :number,
    materialStatus: number,
    description: string
}
