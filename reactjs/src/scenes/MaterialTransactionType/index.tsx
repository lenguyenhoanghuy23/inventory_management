
import React from "react";
import AppComponentBase from "../../components/AppComponentBase";
import MaterialTransactionTypeStore from "../../stores/MaterialTransactionTypeStore";
import TableComponent from "../../components/Table";
import { Button, Dropdown, Menu  } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { L } from "../../lib/abpUtility";
import { inject, observer } from "mobx-react";
import Stores from "../../stores/storeIdentifier";
import { FormInstance } from "antd/lib/form";
import { EntityDto } from "../../services/dto/entityDto";
import CreateOrUpdate from "./components/createOrUpdate";

export interface ITransactionTypeStoreProps{
    materialTransactionTypeStore:MaterialTransactionTypeStore
}
@inject(Stores.MaterialTransactionTypeStore)
@observer
class MaterialTransactionType extends AppComponentBase<ITransactionTypeStoreProps>{
    
    formRef = React.createRef<FormInstance>();
    state = {
        modalVisible: false,
        maxResultCount: 10,
        skipCount: 0,
        userId: 0,
        filter: '',
    };
    
    async componentDidMount() {
        await this.getAll();
    }
    
    async getAll() {
        await this.props.materialTransactionTypeStore.getAll()
    }

    
    getData(){
        const {TransactionType} = this.props.materialTransactionTypeStore
        const rs = TransactionType?.items?.filter((x) => x )
        console.log(rs);
        
        return {items:rs ,totalCount:TransactionType?.totalCount}
    }

    Modal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible,
        });
    };

    async createOrupdateModalOpen(entityDto: EntityDto) {
        console.log(entityDto);
        
        if (entityDto.id === 0) {
            await this.props.materialTransactionTypeStore.CreateTransactionType();
        } else {
            await this.props.materialTransactionTypeStore.get(entityDto);
            
        }
        this.setState({ userId: entityDto.id });
        this.Modal();
        setTimeout(() => {
            this.formRef.current?.setFieldsValue({ ...this.props.materialTransactionTypeStore.editTransactionType });
        }, 100);
    }

    handleCreate =async ()=>{
        const form =  this.formRef.current;
        form!.validateFields().then(async (values:any) =>{
            if (this.state.userId == 0) {
                await this.props.materialTransactionTypeStore.create(values)
            }
            else{
                await this.props.materialTransactionTypeStore.update({...values, id:this.state.userId})
            }
            await this.getAll()
            this.setState({
                modalVisible : false
            })
            form?.resetFields();
        })
    }

    delete = async (input: EntityDto) => {
        const self = this;
        self.props.materialTransactionTypeStore.delete(input);
        this.getAll()
    }

    handleChange = (record: number[]) => {
        // Xử lý giá trị đã nhận được từ 
        console.log(record);
        
    };
    handleTableChange = (pagination: any) => {
        this.setState({ skipCount: (pagination.current - 1) * this.state.maxResultCount! }, async () => await this.getAll());
    };
  
    render() {
        const columns = [
            { title: L('transactionType'), dataIndex: 'transactionType', key: 'transactionType' , render: (text: string) => <div>{text}</div> },
            { title: L('description'), dataIndex: 'description', key: 'description' , render: (text: string) => <div>{text}</div> },
            {
                title: L('Actions'),
                width: 50,
                render: (text: string, item: any) => (
                <div>
                    <Dropdown
                    trigger={['click']}
                    overlay={
                        <Menu>
                        <Menu.Item onClick={() => this.createOrupdateModalOpen({id:item.id})}>{L('Edit')}</Menu.Item>
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
            ];
        return(
            <div>
                <TableComponent
                    columns ={columns}
                    datarow={this.getData()}
                    handleCreate={() => this.createOrupdateModalOpen({id:0})}
                    handleExportExcel={() =>{}}
                    handleExportFilePdf={() =>{}}
                    handleImport={() =>{}}
                    handleOnRow={() =>{}}
                    handleSearch={()=>{}}
                    handleTableChangePagination={() => {}}
                    DisableAdd= {false}
                    title=""
                />
                <CreateOrUpdate
                    formRef={this.formRef}
                    visible={this.state.modalVisible}
                    onCancel={() => this.setState({
                        modalVisible :false
                    })}
                    modalType={this.state.userId === 0 ? 'edit' : 'create'}
                    onCreate={this.handleCreate}
                />
                   
                   
            </div>
        )
    }
}
export default MaterialTransactionType