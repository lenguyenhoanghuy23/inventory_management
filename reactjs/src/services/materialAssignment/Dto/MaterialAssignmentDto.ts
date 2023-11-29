export interface GetAllAssignmentInput{
   id:number,
   materialNumber:string,
   materialStatus: number,
   materialType:string
   description:string
}

export interface GetAllAssignmentOutput{
   id:number,
   materialNumber:string,
   materialStatus: number,
   materialType:string
   description:string
}

export interface createInput{
   id:number,
   materialNumber: string,
   organizationUnitId :number
}
export interface createForAdmin{
   id:number,
   materialNumber: string,
   organizationUnitId :number
}

