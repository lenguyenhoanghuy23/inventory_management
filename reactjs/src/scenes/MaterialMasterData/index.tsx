import React from "react";
import AppComponentBase from "../../components/AppComponentBase";
import TableComponent from "../../components/Table";
import { Button, Col, Dropdown, Menu, Modal, Row} from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { L } from "../../lib/abpUtility";
import { inject , observer} from "mobx-react";
import Stores from "../../stores/storeIdentifier";
import MaterialMasterDataStore from "../../stores/MaterialMasterDataStore";
import Form, { FormInstance } from "antd/lib/form";
import "../../Style/Style.css"
import { EntityDto } from "../../services/dto/entityDto";
import { utils, writeFile } from "xlsx";
import CreateOrUpdateComponent from "../../components/CreateOrUpdate";
import  {  error ,success, warning} from "../../components/MessageApi/messageApi";
import provOrgStore from "../../stores/provOrgStore";
import { ComponentFormItem, filterFormItems,ComponentFormSelect } from "../../components/ColumnsAndFormComponent/FormComponent";
import { GetGroup, GetOrganization, GetStatus, GetType } from "../../services/MaterialMasterData/Dto/MasterDataDto";
import { IReactionDisposer, autorun } from "mobx";
import { debounce } from "lodash";
import materialAssignmentStore from "../../stores/MaterialAssignmentStore";
import ImportFileComponent from "../../components/ImportFileComponet/importFileComponent";

const confirm = Modal.confirm;
export interface IMasterProps{
    masterDataStore: MaterialMasterDataStore,
    materialAssignmentStore:materialAssignmentStore,
    provOrgStore: provOrgStore,
}
declare var abp: any;

export interface IMasterState{
    modalVisible: boolean;
    modalVisibleImport :boolean;
    maxResultCount: number;
    skipCount: number;
    userId: number;
    filter: string;
    OrganizationUnitId:number
    items:string[]
    Description:string; // mo ta la khi chon la cua assigment
}


@inject(Stores.MasterDataStore , Stores.ProvOrgStore , Stores.MaterialAssignmentStore)
@observer
class MaterialMasterData extends AppComponentBase<IMasterProps , IMasterState>{
    asyncTask: IReactionDisposer | null = null;
    formRef = React.createRef<FormInstance>();
    state = {
        modalVisible: false,
        modalVisibleImport: false, 
        maxResultCount: 10,
        skipCount: 0,
        userId: 0,
        filter: '',
        OrganizationUnitId:0,
        Description:"",
        items :["id","materialNumber","description","primaryUom","secondaryUom","desGroup","destype","desStatus","materialType","materialStatus","materialGroup"]
    };
    async componentDidMount() {
        this.asyncTask = autorun(() => {
            const { selectedValues } = this.props.provOrgStore;
            this.getAllWithOrg(selectedValues);
          });
    }

    componentWillUnmount() {
        if (this.asyncTask) {
          this.asyncTask();
        }
    }
    async getAll() {
        await this.props.masterDataStore.getOrganization();
        await this.props.masterDataStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter , OrganizationUnitId: this.state.OrganizationUnitId });
    }

    handleTableChange = (pagination: any) => {
        this.setState({ skipCount: (pagination.current - 1) * this.state.maxResultCount! }, async () => await this.getAll());
      };
  
    getAllWithOrg = async ( selectedValues : number) =>  {
        if (selectedValues === undefined) {
            this.setState({ OrganizationUnitId: 0 }, async () => {
                await this.getAll();
            });
            warning("Please select an organization to view")
            return;
        }
        this.setState({ OrganizationUnitId: selectedValues }, async () => {
            await this.getAll();
        });
    }
   
    Modal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible,
        });
    };

    async createOrupdateModalOpen(entityDto: EntityDto) {
        if (entityDto.id === 0) {
            await this.props.masterDataStore.CreateMasterData();
            await this.props.materialAssignmentStore.CreateAssigment();
            await this.props.masterDataStore.getType()
            await this.props.masterDataStore.getGroup()
            await this.props.masterDataStore.getStatus()
        } else {
            await this.props.masterDataStore.get(entityDto);          
            await this.props.masterDataStore.getType()
            await this.props.masterDataStore.getGroup()
            await this.props.masterDataStore.getStatus()
        }
        this.setState({ 
            userId: entityDto.id,
            Description:"",
        });
        this.Modal();
        
        setTimeout(() => {
            this.formRef.current?.setFieldsValue({ ...this.props.masterDataStore.editMaster });
        }, 100);
    }

    importModalOpen (){
        this.setState({
            modalVisibleImport: !this.state.modalVisibleImport,
        });
    }

    async asyncAssigment(entityDto: EntityDto , des:any){

        this.setState({Description: des.des})
        await this.props.masterDataStore.get(entityDto);
        this.Modal();  
        setTimeout(() => {
            this.formRef.current?.setFieldsValue({ ...this.props.masterDataStore.editMaster });
        }, 100);
    }

    handleCreate =async ()=>{
        const form =  this.formRef.current;
        const {selectedValues} = this.props.provOrgStore
        form!.validateFields().then(async (values:any) =>{
            if (this.state.userId == 0) {
                await this.props.masterDataStore.create( {...values , OrganizationUnitId:selectedValues})
                const sendAssigment ={
                    id:0,
                    materialNumber: values.materialNumber,
                    organizationUnitId:0
                }
                await this.props.materialAssignmentStore.createForAdmin(sendAssigment)
            }
            else{
                await this.props.masterDataStore.update({...values, id:this.state.userId})
            }
            await this.getAll();
            this.setState({
                modalVisible:false
            })
            form?.resetFields();
        })
    }


    handleAssigment = async () =>{ // assigment raw material form masterData to materialItem
        const form =  this.formRef.current;
        form!.validateFields().then(async (values:any) =>{
            console.log( values);

            const sendData = {
                id:0,
                materialNumber: values.materialNumber,
                organizationUnitId:values.Assigment
            }
            
            try {
                await this.props.materialAssignmentStore.create(sendData)
                success("Add success"+ sendData.materialNumber)
            } catch (err) {
                error(`Add fail `+ err )
            }
            this.setState({
                modalVisible:false
            })
        })
    }
    delete  = async (input: EntityDto) =>  {
        const self = this;
        const handleDelete = async () => {
            await self.props.masterDataStore.delete(input);
            await this.getAll();
        };
        confirm({
            title: L('Do you want to delete these items?'),
            async onOk() {
                await handleDelete();
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target?.value;
        this.setState({ filter: value}, async () => {
            await this.getAll();
            console.log(this.state.filter);
        });
    }, 500, { leading: true });
    
    handleImport = async (e: React.ChangeEvent<HTMLInputElement>):Promise<void> => {
        const file = e.target.files?.[0];
        if (file) {
            //await this.props.masterDataStore?.ImportExcelData(file);
            //await this.getAll()
            console.log(file);
        }
    }

    

    handleExportExcel = () => {
        const  {Master} = this.props.masterDataStore
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([] ,{skipHeader:true});
        ws['!cols'] = [
            { width: 15 }, 
            { width: 15 },
            { width: 35 },
            { width: 15 },
            { width: 10 },
            { width: 10 },
            { width: 10 },
            
        ];
        const data = Master.items.map((item) => {
            return {
                'materialNumber': item.materialNumber,
                'description': item.description,
                'materialGroup': item.materialGroup,
                'primaryUom': item.primaryUom,
                'secondaryUom': item.secondaryUom,
                'Type' :item.materialType,
                'status': item.materialStatus
            };
        });
        utils.sheet_add_json(ws, data, { skipHeader: false, origin: 'A1' });
        utils.book_append_sheet(wb, ws, 'Report');
        writeFile(wb, 'MasterData_Report.xlsx');
    }
    form(){
       
        const {items} = this.state
        const {MGroup ,MType ,MStatus} = this.props.masterDataStore
        const result = ComponentFormItem(items , "sizeInput-border text");
        const filter= filterFormItems(result , [0 , 5 , 6 ,7])
        
        const optGroup = MGroup.map((x:GetGroup) => {
            var result = {label:x.materialGroup +"-"+ x.description , value:x.materialGroup } 
            return result
        })
        const optType = MType.map((x:GetType) => {
            var result = {label:x.materialTypes +"-"+ x.description , value:x.materialTypes } 
            return result
        })
        const optStatus = MStatus.map((x:GetStatus) => {
                var result = { label:x.materialStatus +"-"+ x?.description   , value:x.materialStatus } 
                return result
        })
        const optUnit = [{ value: 'Kg' }, { value: 'piece' }];
        filter[2]  =(
            ComponentFormSelect( "primaryUom" ,optUnit , "sizeInput-border text" )
        )
        filter[3]  =(
            ComponentFormSelect( "secondaryUom" ,optUnit , "sizeInput-border text" )
        )
        filter[4]  =(
            ComponentFormSelect( result[8].key ,optType , "sizeInput-border text" )
        )
        filter[5]  =(
            ComponentFormSelect( result[9].key ,optStatus , "sizeInput-border text " )
        )
        filter[6]  =(
            ComponentFormSelect( result[10].key ,optGroup , "sizeInput-border text" )
        )
        return  (
                    <Form  ref={this.formRef}  > 
                            <p>Edit</p>
                            <Row className="row" >
                                <Col span={12}> {filter.slice(0,4)}</Col>
                                <Col span={12}> {filter.slice(4,8)}</Col>
                            </Row>
                   
                    </Form>
        )
    }

    formAssigment(){
        const {items} = this.state
        const {MGroup ,MType ,MStatus , organization} = this.props.masterDataStore
        const result = ComponentFormItem(items , "sizeInput-border text");
        const filter= filterFormItems(result , [0 , 5 , 6 ,7])
        
        const optGroup = MGroup.map((x:GetGroup) => {
            var result = {label:x.materialGroup +"-"+ x.description , value:x.materialGroup } 
            return result
        })
        const optType = MType.map((x:GetType) => {
            var result = {label:x.materialTypes +"-"+ x.description , value:x.materialTypes } 
            return result
        })
        const optOu = organization.map((x:GetOrganization) => {
            var result = {label:x.displayName  , value:x.id } 
            return result
        })
        const optStatus = MStatus.map((x:GetStatus) => {
                var result = { label:x.materialStatus +"-"+ x?.description   , value:x.materialStatus } 
                return result
        })
        const optUnit = [{ value: 'Kg' }, { value: 'piece' }];
        filter[2]  =(
            ComponentFormSelect( "primaryUom" ,optUnit , "sizeInput-border text" )
        )
        filter[3]  =(
            ComponentFormSelect( "secondaryUom" ,optUnit , "sizeInput-border text" )
        )
        filter[4]  =(
            ComponentFormSelect( result[8].key ,optType , "sizeInput-border text" )
        )
        filter[5]  =(
            ComponentFormSelect( result[9].key ,optStatus , "sizeInput-border text " )
        )
        filter[6]  =(
            ComponentFormSelect( result[10].key ,optGroup , "sizeInput-border text" )
        )
        return  (
                    <Form  ref={this.formRef}  > 
                            <p>Assigment</p>
                            <Row className="row" style={{pointerEvents:'none' , opacity:"0.9"}} >
                                <Col span={12}> {filter.slice(0,4)}</Col>
                                <Col span={12}> {filter.slice(4,8)}</Col>
                            </Row>
                            <Row className="row">
                               {ComponentFormSelect( "Assigment" ,optOu , "sizeInput-border text " )}
                            </Row>
                   
                    </Form>
        )
    }

    getData(){
        const {Master} = this.props.masterDataStore
        const rs = Master?.items?.filter((x) => x)
        return {items:rs ,totalCount:Master?.totalCount}
    }

    render() {
        const {selectedlabel} = this.props.provOrgStore
        const columns =[
            {   
                title: L('materialNumber'), 
                dataIndex: 'materialNumber',key: 'materialNumber', 
                editable: true,
                render: (text: string) => <div>{text}</div> 
            },
            {   
                title: L('description'), 
                dataIndex: 'description',key: 'description', 
                editable: true,
                render: (text: string) => <div>{text}</div> 
            },
            {   
                title: L('materialType'), 
                dataIndex: 'materialType',key: 'materialType', 
                editable: true,
                render: (text: string , record:any ) => (
                    <div>
                        {text +" / "+ record.destype}
                    </div>
                ),
            },
            {   
                title: L('materialStatus'), 
                dataIndex: 'materialStatus',key: 'materialStatus', 
                editable: true,
                render: (text: string , record:any ) => (
                    <div>
                        {text +" / "+ record.desStatus}
                    </div>
                ),
            },
            {   
                title: L('materialGroup'), 
                dataIndex: 'materialGroup',key: 'materialGroup', 
                editable: true,
                render: (text: string , record:any ) => (
                    <div>
                        {text +" / "+ record.desGroup}
                    </div>
                ),
            },
            {
                title: 'Uom',
                children: [
                    {
                        title: L('primaryUom'),
                        dataIndex: 'primaryUom',
                        key: 'primaryUom',
                    },
                    {
                        title: L('secondaryUom'),
                        dataIndex: 'secondaryUom',
                        key: 'secondaryUom',
                    },
                ]
            },
            {
                title: L('Actions'),
                width: 150,
                render: (text: string, item: any) => (
                <div>
                    <Dropdown
                    trigger={['click']}
                    overlay={
                        <Menu>
                        <Menu.Item onClick={() => this.createOrupdateModalOpen({id:item.id})}>{L('Edit')}</Menu.Item>
                        {selectedlabel === "Admin" ?  
                                <Menu.Item onClick={() => this.asyncAssigment({id:item.id} ,{des:"assigment"})}>{L('Assignment')}</Menu.Item> : null  
                        }
                      
                        <Menu.Item onClick={()=> this.delete({id :item.id}) }>{L('Delete')}</Menu.Item>
                        </Menu>
                    }
                    placement="bottomLeft"
                    >
                    <Button type="primary" icon={<SettingOutlined />}>
                        {L('Actions')}
                    </Button>
                    </Dropdown>
                </div>
                ),
            },

        ]

        return(
                <div>
                    <TableComponent
                        columns ={columns}
                        datarow= {this.getData()}
                        handleCreate={() => this.createOrupdateModalOpen({id:0})}
                        handleExportExcel ={this.handleExportExcel}
                        handleImport={() => this.importModalOpen()}
                        handleExportFilePdf={() => {}}
                        handleOnRow={() =>{}}
                        handleSearch = {(e: React.ChangeEvent<HTMLInputElement>) =>this.handleSearch(e)}
                        DisableAdd= {false}
                        handleTableChangePagination={(pagination:any) => this.handleTableChange(pagination)}
                        title="Material Master"
                    />
                    <CreateOrUpdateComponent
                        formRef={this.formRef}
                        visible={this.state.modalVisible}
                        onCancel={() => this.setState({
                            modalVisible :false
                        })}
                        footer ={undefined }
                        onCreate={this.state.Description ==="assigment"? () => this.handleAssigment() : this.handleCreate}
                        form={this.state.Description ==="assigment"?  this.formAssigment() : this.form()}
                        className=""
                        width={1000}
                    />

                    <ImportFileComponent
                        visible={this.state.modalVisibleImport}
                        onCancel={() => this.setState({
                            modalVisibleImport :false
                        })}
                    />
                </div>
        )
    }
}

export default MaterialMasterData





