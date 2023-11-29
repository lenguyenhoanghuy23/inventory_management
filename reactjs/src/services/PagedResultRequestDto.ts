import { PagedFilterAndSortedRequest } from "./dto/pagedFilterAndSortedRequest";

export interface PagedResultRequestDto extends PagedFilterAndSortedRequest  {
    keyword: string
    OrganizationUnitId :number
    // FromPlant:string
}
