import { Button, Dropdown, Menu, Modal } from "antd";
import AppComponentBase from "../../components/AppComponentBase";
import * as React from 'react';
import TableComponent from "../../components/Table";
import { SettingOutlined } from "@ant-design/icons";
import { L } from "../../lib/abpUtility";
import MTypeStore from "../../stores/MTypeStore";
import { inject, observer } from "mobx-react";
import Stores from "../../stores/storeIdentifier";
import { FormInstance } from "antd/lib/form";
import CreateOrUpdate from './components/createOrUpdate'
import { EntityDto } from "../../services/dto/entityDto";

export interface IMTypeProps{
    mTypeStore:MTypeStore
}

export interface IMTypeState {
    modalVisible: boolean;
    maxResultCount: number;
    skipCount: number;
    userId: number;
    filter: string;
}

const confirm = Modal.confirm;

@inject(Stores.MTypeStore)
@observer
class MaterialType extends AppComponentBase <IMTypeProps,IMTypeState>{
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
        await this.props.mTypeStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
    }
    handleTableChange = (pagination: any) => {
        this.setState({ skipCount: (pagination.current - 1) * this.state.maxResultCount! }, async () => await this.getAll());
    };

    getData(){
        const {mtype} = this.props.mTypeStore
        const rs = mtype?.items?.filter((x) => x )
        console.log(rs);
        
        return {items:rs ,totalCount:mtype?.totalCount}
    }

    modal = () =>{
        this.setState({
            modalVisible : !this.state.modalVisible
        })
    }

    createOrupdateModalOpen = async (entityDto:EntityDto)=>{
        if (entityDto .id === 0) {
            await this.props.mTypeStore.createMType();
        }
        else{
            await this.props.mTypeStore.get(entityDto)
        }
        this.setState({ userId: entityDto.id });
        this.modal()
        setTimeout(() => {
            this.formRef.current?.setFieldsValue({ ...this.props.mTypeStore.editmtype });
        }, 100);
    }

    handleCreate =async ()=>{
        const form =  this.formRef.current;
        form!.validateFields().then(async (values:any) =>{
            if (this.state.userId == 0) {
                console.log(values);
                await this.props.mTypeStore.create(values)
            }
            else{
                await this.props.mTypeStore.update({...values, id:this.state.userId})
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
            self.props.mTypeStore.delete(input);
        },
        onCancel() {
            console.log('Cancel');
        },
        });
    }
    
    render() {
        const columns = [
            {   
                title: L('materialTypes'), 
                dataIndex: 'materialTypes',key: 'materialTypes', 
                editable: true,
                render: (text: string) => <div>{text}</div> 
            },
            {   
                title: L('Mo ta'), 
                dataIndex: 'description', key: 'description', 
                editable: true,
                render: (text: string ) => (<div>{text}</div> )},
            {
                title: L('Actions'),
                width: 50,
                editable: true,
                render: (text: string, item: any) => (
                <div>
                    <Dropdown
                        trigger={['click']}
                        overlay={
                            
                            <div>
                                <Menu>
                                    <Menu.Item onClick={() => this.createOrupdateModalOpen({id: item.id})} >{L('Sửa')}</Menu.Item>
                                    <Menu.Item onClick={() => this.delete({ id: item.id})}>{L('Delete')}</Menu.Item>
                                </Menu>
                            </div>
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
                    title="Material Type"
                    handleCreate={() => this.createOrupdateModalOpen({id:0})}
                    handleExportFilePdf ={() =>{}}
                    handleExportExcel ={() => {}}
                    handleOnRow ={ () => {}}
                    handleSearch ={() => {}}
                    handleImport={ () => {}}
                    DisableAdd={false}
                    handleTableChangePagination={() => {}}
                    
                />
                <CreateOrUpdate 
                    visible = {this.state.modalVisible}
                    formRef={this.formRef}
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

export default MaterialType