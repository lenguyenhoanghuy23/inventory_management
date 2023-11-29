
import React from "react";
import AppComponentBase from "../../components/AppComponentBase";
import { Button, Dropdown, Menu, Modal } from "antd";
import TableComponent from "../../components/Table";
import { SettingOutlined } from "@ant-design/icons";
import { L } from "../../lib/abpUtility";
import MStatusStore from "../../stores/MStatusStore";
import { inject, observer } from "mobx-react";
import Stores from "../../stores/storeIdentifier";
import { EntityDto } from "../../services/dto/entityDto";
import { FormInstance } from "antd/lib/form";

import CreateOrUpdate from "./components/CreateOrUpdate";


export interface IMStatusProps {
    mStatusStore : MStatusStore
}


const confirm = Modal.confirm;

@inject(Stores.MStatusStore)
@observer
class MaterialStatus extends AppComponentBase<IMStatusProps >{
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
        await this.props.mStatusStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
    }

    handleTableChange = (pagination: any) => {
        this.setState({ skipCount: (pagination.current - 1) * this.state.maxResultCount! }, async () => await this.getAll());
    };

    getData(){
        const {mstatus} = this.props.mStatusStore
        const rs = mstatus?.items?.filter((x) => x )
        console.log(rs);
        return {items:rs ,totalCount:mstatus?.totalCount}
    }

    Modal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible,
        });
    };

    async createOrupdateModalOpen(entityDto: EntityDto) {

        console.log(entityDto.id);
        
        if (entityDto.id === 0) {
            await this.props.mStatusStore.CreateMStatus();
        
        } else {
            await this.props.mStatusStore.get(entityDto);
        }

        this.setState({ userId: entityDto.id });
        this.Modal();
    
        setTimeout(() => {
            this.formRef.current?.setFieldsValue({ ...this.props.mStatusStore.editMTStatus });
        }, 100);
    }

    handleCreate =async ()=>{
        const form =  this.formRef.current;
        form!.validateFields().then(async (values:any) =>{
            if (this.state.userId == 0) {
                console.log(values);
                await this.props.mStatusStore.create(values)
            }
            else{
                await this.props.mStatusStore.update({...values, id:this.state.userId})
            }
            await this.getAll()
            this.setState({
                modalVisible : false
            })
            form?.resetFields();
        })
    }

    delete(input: EntityDto) {
        const self = this;
        confirm({
            title: 'Do you Want to delete these items?',
            onOk() {
            self.props.mStatusStore.delete(input);
        },
        onCancel() {
            console.log('Cancel');
        },
        });
    }
    render() {
        const columns = [
            { title: L('material Status'), dataIndex: 'materialStatus', key: 'materialStatus' , render: (text: string) => <div>{text}</div> },
            { title: L('description'), dataIndex: 'description', key: 'description', render: (text: string) => <div>{text}</div> },
            {
                title: L('Actions'),
                width: 50,
                render: (text: string, item: any) => (
                <div>
                    <Dropdown
                    trigger={['click']}
                    overlay={
                        <Menu>
                            <Menu.Item onClick={() => this.createOrupdateModalOpen({id:item.id})} >{L('Edit')}</Menu.Item>
                            <Menu.Item onClick={() => this.delete({id:item.id})} >{L('Delete')}</Menu.Item>
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
                    datarow = {this.getData()}
                    handleCreate={() => this.createOrupdateModalOpen({id:0})}
                    handleExportExcel={() =>{}}
                    handleExportFilePdf={() =>{}}
                    handleImport={() =>{}}
                    handleOnRow={()=>{}}
                    handleSearch={() =>{}}
                    DisableAdd= {false}
                    handleTableChangePagination={() => {}}
                    title="Material Status"
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

export default MaterialStatus