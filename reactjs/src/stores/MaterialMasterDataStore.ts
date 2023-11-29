
import {  PagedMasterDataResultRequestDto,GetMasterDataOutput,CreateOrUpdateMasterData, UpdateMasterDataInput, GetType, GetStatus, GetGroup, GetOrganization} from "../services/MaterialMasterData/Dto/MasterDataDto"
import { PagedResultDto } from "../services/dto/pagedResultDto"
import { action, observable } from "mobx"
import MaterialMasterDataService from "../services/MaterialMasterData/MaterialMasterDataService"
import { EntityDto } from "../services/dto/entityDto"


class MaterialMasterDataStore {
    @observable  Master!:  PagedResultDto<GetMasterDataOutput>
    @observable  editMaster!: CreateOrUpdateMasterData
    @observable  MType :GetType[]=[] 
    @observable  MStatus :GetStatus[]=[] 
    @observable  MGroup :GetGroup[]=[]
    @observable organization: GetOrganization[] = [];
    @observable  ExcelFile!:File
    

    @action
    async getAll(pagedFilterAndSortedRequest: PagedMasterDataResultRequestDto ){
        let result =  await MaterialMasterDataService.getAll(pagedFilterAndSortedRequest)
        this.Master = result
    }
    
    @action
    async get(entityDto:EntityDto){
        let result = await MaterialMasterDataService.get(entityDto)
        console.log(result);
        
        this.editMaster =  result;
    }

    @action
    async getOrganization() {
      let result = await MaterialMasterDataService.getOrganization();
      this.organization = result;
    }

    @action async getType(){
        let result = await MaterialMasterDataService.getType()
        this.MType = result
    }
    @action async getStatus(){
        let result = await MaterialMasterDataService.getStatus()
        this.MStatus = result
    }

    @action async getGroup(){
        let result = await MaterialMasterDataService.getMGroup()
        this.MGroup = result
    }

    @action
    async create(createMasterData : CreateOrUpdateMasterData){
        let result =  await MaterialMasterDataService.create(createMasterData)
        this.Master.items.push(result)
    }

    @action
    async ImportExcelData(file:File):Promise<void> {
        try {
            let result = await MaterialMasterDataService.ImportExcel(file)
            console.log(`Uploaded file ${file.name} of type ${file.type} with content ${file.size}`);
            this.ExcelFile = result
        } catch (error) {
            console.log("lỗi khi import dữ liệu excel");
            
        }
    }

    @action
    async update(update:UpdateMasterDataInput) {
        console.log(update);
        
        let result = await MaterialMasterDataService.update(update)
        this.Master.items= this.Master.items.map((x:GetMasterDataOutput) =>{
            if (x.id === update.id) {
                x=  result;
            }
            return x;
        })
    }


    @action
    async delete (entityDto: EntityDto ) {
        await MaterialMasterDataService.detele(entityDto);
        this.Master.items = this.Master.items
            .filter((x: GetMasterDataOutput) =>x.id !== entityDto.id   )
    }

    @action
    async CreateMasterData(){
        this.editMaster ={
            id:0,
            description:"",
            materialNumber:"",
            primaryUom:"",
            secondaryUom:"",
            materialStatus:0,
            materialType:"",
            materialGroup:"",
            organizationUnitId:0,
        };

    }

}
export default MaterialMasterDataStore