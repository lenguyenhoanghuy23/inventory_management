import { PagedFilterAndSortedRequest } from "../../dto/pagedFilterAndSortedRequest";

export interface PagedMasterDataResultRequestDto extends PagedFilterAndSortedRequest{
    keyword :string
    OrganizationUnitId:number
}

export interface GetAllMasterData {
    id: number
    materialNumber: string,
    description: string,
    primaryUom: string,
    secondaryUom: string,
    desGroup: string,
    destype: string,
    desStatus: string,
    materialGroup: string,
    materialStatus: number,
    materialType: string
    organizationUnitId:number;
}

export interface CreateOrUpdateMasterData {
    id: number
    materialNumber: string,
    description: string,
    primaryUom: string,
    secondaryUom: string,
    materialGroup: string,
    materialStatus: number,
    materialType: string
    organizationUnitId:number;
}
export interface UpdateMasterDataInput {
    id: number
    materialNumber: string,
    description: string,
    primaryUom: string,
    secondaryUom: string,
    materialGroup: string,
    materialStatus: number,
    materialType: string
}
export interface GetMasterDataOutput {
    id: number
    materialNumber: string,
    description: string,
    primaryUom: string,
    secondaryUom: string,
    desGroup: string,
    destype: string,
    desStatus: string,
    materialGroup: string,
    materialStatus: number,
    materialType: string
    organizationUnitId:number;
}

export interface GetType{
    id: number,
    materialTypes: string,
    description: string,
}


export interface GetStatus{
    id:number
    materialStatus: number,
    description: string
}

export interface GetGroup{
    id:number
    materialGroup: string,
    description: string
}



export interface GetOrganization{
    id: number,
    displayName: string
  }

