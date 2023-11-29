export interface getAllOrganizationUnit{
    id: number,
    displayName: string
}
export interface getOrganizationUnitOutput{
    id: number,
    displayName: string
}
export interface createOUInput{
    id: number,
    displayName: string
    parentId:number
    
}

export interface UpdateOUInput{
    id: number,
    displayName: string
}