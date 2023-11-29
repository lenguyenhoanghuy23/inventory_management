import React from "react";
import AppComponentBase from "../../components/AppComponentBase";
import TableComponent from "../../components/Table";
import provOrgStore from "../../stores/provOrgStore";
import { inject, observer } from "mobx-react";
import Stores from "../../stores/storeIdentifier";
import { Columns, filterColumnItems } from "../../components/ColumnsAndFormComponent/ColumnsComponent";
import CreateOrUpdateComponent from "../../components/CreateOrUpdate";
import { autorun } from "mobx";
import { warning } from "../../components/MessageApi/messageApi";
import goodReceiptStore from "../../stores/goodReceiptStore";
import materialIventoryStore from "../../stores/materialIventoryStore";


interface InventoryProps {
    goodReceiptStore:goodReceiptStore,
    materialIventoryStore:materialIventoryStore,
    provOrgStore: provOrgStore,
}
 
interface InventoryState {
    items:string[],
    modalVisible: boolean,
    maxResultCount: number,
    skipCount: number,
    userId: number,
    key:number,
    filter: any,
    OrganizationUnitId: number
}
@inject(Stores.ProvOrgStore , Stores.MaterialIventoryStore  )
@observer
class Inventory extends AppComponentBase<InventoryProps, InventoryState> {
    state = { 
      modalVisible: false,
      maxResultCount: 5,
      skipCount: 0,
      userId: 0,
      key:0,
      filter: '',
      OrganizationUnitId:0,
      items: ["id","materialNumber","materialType","inventoryQuantity","materialLot","plant","subLocation"]
    }


    async componentDidMount() {
      
      autorun(() => {
        const {selectedValues} =  this.props.provOrgStore
        this.getAllWithOrg(selectedValues)
      })
    }
    // console.log("please select an organzation to view");
    async getAll() {
       await this.props.materialIventoryStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter ,OrganizationUnitId:this.state.OrganizationUnitId });
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

    handleTableChange = (pagination: any) => {
      this.setState({ skipCount: (pagination.current - 1) * this.state.maxResultCount! }, async () => await this.getAll());
    };
  
    columnsCustom (){
      const {items} =this.state
      let col =  Columns(items);
      let filter =  filterColumnItems(col , [0])
      return filter;

    }

    getData(){
      const {inventory} = this.props.materialIventoryStore
      const rs = inventory?.items?.filter((x) => x)
      return {items:rs ,totalCount:inventory?.totalCount}
    }


    render() {
      //const {receipt} = this.props.goodReceiptStore
        return ( 
            <div> 
                <TableComponent
                    columns={this.columnsCustom()}
                    datarow={this.getData()}
                    handleExportExcel={() =>{}}
                    handleExportFilePdf={() =>{}}
                    handleImport={() =>{}}
                    handleOnRow={() =>{}}
                    handleSearch={() =>{}}
                    handleCreate={() => {}}
                    DisableAdd= {this.props.provOrgStore.selectedValues === undefined ? true : false}
                    handleTableChangePagination={(pagination:any) => this.handleTableChange(pagination)}
                    title="Inventory"
                />
                <CreateOrUpdateComponent
                    formRef={null}
                    visible={this.state.modalVisible}
                    onCancel={() => this.setState({
                        modalVisible :false
                    })}
                    onCreate={() =>{}}
                    footer ={undefined }
                    form={{}}
                    className=""
                    width={1000}
                  />
            </div>
         );
    }
}
 
export default Inventory;