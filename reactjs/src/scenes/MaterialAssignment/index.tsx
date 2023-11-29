import React from "react";
import AppComponentBase from "../../components/AppComponentBase";
import TableComponent from "../../components/Table";
import { Columns, filterColumnItems } from "../../components/ColumnsAndFormComponent/ColumnsComponent";
import { inject, observer } from "mobx-react";
import Stores from "../../stores/storeIdentifier";
import materialAssignmentStore from "../../stores/MaterialAssignmentStore";
import { autorun } from "mobx";
import { warning } from "../../components/MessageApi/messageApi";
import provOrgStore from "../../stores/provOrgStore";
import { SettingOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Button, Modal } from "antd";
import { L } from "../../lib/abpUtility";
import { EntityDto } from "../../services/dto/entityDto";

const confirm = Modal.confirm;

interface MaterialAssignmentProps {
    materialAssignmentStore:materialAssignmentStore,
    provOrgStore: provOrgStore,
}
 
interface MaterialAssignmentState {
    modalVisible: boolean,
    maxResultCount: number,
    skipCount: number,
    userId: number,
    key:number,
    filter: any,
    OrganizationUnitId:number
    items:string[]
}
 
@inject(Stores.MaterialAssignmentStore, Stores.ProvOrgStore)
@observer
class MaterialAssignment extends AppComponentBase<MaterialAssignmentProps, MaterialAssignmentState> {
    state ={
        modalVisible: false,
        maxResultCount: 10,
        skipCount: 0,
        userId: 0,
        key:0,
        filter: '',
        OrganizationUnitId:0,
        items:["id","materialNumber","description","materialStatus","materialType"]
        
    }
    async componentDidMount() {
      
        autorun(() => {
          const {selectedValues } =  this.props.provOrgStore
          this.getAllWithOrg(selectedValues)
        })
    }
    // console.log("please select an organzation to view");
    async getAll() {
        await this.props.materialAssignmentStore?.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter , OrganizationUnitId: this.state.OrganizationUnitId });
    }
    getAllWithOrg(selectedValues: number) {
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
    getData(){
        const {Assignment} = this.props.materialAssignmentStore
        const rs = Assignment?.items?.filter((x) => x )        
        return {items:rs ,totalCount:Assignment?.totalCount}
    }

    columnCustom (){
        const {items} = this.state
        const {selectedNameUser} = this.props.provOrgStore
        let col =  Columns(items);
        const filter = filterColumnItems(col,[0])

        console.log(selectedNameUser);
        
        if (selectedNameUser === "admin") {
            
            filter.push({
              title: L('Actions'),
              width: 150,
              render: (text: string, item: any) => (
                <div>
                  <Dropdown
                    trigger={['click']}
                    overlay={
                      <Menu>
                        <Menu.Item onClick={() => {}}>{L('Edit')}</Menu.Item>
                        <Menu.Item onClick={() => this.delete({id:item.id})}>{L('Delete')}</Menu.Item>
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
            });
        }
        
        return filter
    }

    delete =async (entityDto:EntityDto) => {
        const self = this;
        const handleDelete = async () => {
            await self.props.materialAssignmentStore?.delete(entityDto);
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
    render() { 
        return ( 
            <div>
                <TableComponent
                    columns={this.columnCustom()}
                    datarow={this.getData()}
                    handleExportExcel={()=> {}}
                    handleExportFilePdf={() =>{}}
                    handleImport={() =>{}}
                    handleOnRow={() =>{}}
                    handleSearch={() =>{}}
                    handleTableChangePagination={() =>{}}
                    DisableAdd 
                    handleCreate={() =>{}}
                    title=""
                />
            </div> 
        );
    }
}
 
export default MaterialAssignment;