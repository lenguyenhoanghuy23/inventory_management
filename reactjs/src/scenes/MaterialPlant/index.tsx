import * as React from 'react';

import AppComponentBase from "../../components/AppComponentBase";
import { inject, observer } from "mobx-react";
import Stores from "../../stores/storeIdentifier";
import MaterialPlantStore from "../../stores/MaterialPlantStore";
import { Button, Card, Dropdown, Input, Menu, Tabs } from "antd";
import TableComponent from "../../components/Table";
import { SettingOutlined } from "@ant-design/icons";
import { L } from "../../lib/abpUtility";
import { EntityDto } from "../../services/dto/entityDto";
import Form, { FormInstance } from "antd/lib/form";
import { formItemLayout } from "../formLayout";
import CreateOrUpdateComponent from "../../components/CreateOrUpdate";



export interface IProps {
    materialPlantStore: MaterialPlantStore;
}

export interface IState {
    modalVisible: boolean;
    maxResultCount: number;
    skipCount: number;
    userId: number;
    filter: string;
    OrganizationUnitId:number
}

@inject(Stores.MaterialPlantStore)
@observer
class Plant extends AppComponentBase<IProps ,IState> {
    formRef = React.createRef<FormInstance>();
    state = {
        modalVisible: false,
        maxResultCount: 10,
        skipCount: 0,
        userId: 0,
        filter: '',
        OrganizationUnitId:0
    };

    async componentDidMount() {
        await this.getAll();
    }
    
    async getAll() {
        
        // await this.props.materialPlantStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter,OrganizationUnitId:this.state.OrganizationUnitId});
    }
    handleTableChange = (pagination: any) => {
        this.setState({ skipCount: (pagination.current - 1) * this.state.maxResultCount! }, async () => await this.getAll());
      };  
    Modal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible,
        });
    };

    async createOrupdateModalOpen(entityDto: EntityDto) {
       
        if (entityDto.id == 0) {
            await this.props.materialPlantStore.createPlant()
        }
        else {
            console.log(entityDto);
            
            await this.props.materialPlantStore.get(entityDto)
        }
        this.setState({ userId: entityDto.id });
        this.Modal();
        setTimeout(() => {
            this.formRef.current?.setFieldsValue({ ...this.props.materialPlantStore.edit });
        }, 100);
    }


    handleCreate = () => {
        const form = this.formRef.current;
        form!.validateFields().then(async (values: any) => {
        if (this.state.userId === 0) {
            console.log(values);
            
            await this.props.materialPlantStore.create(values);
        } else {
            
            await this.props.materialPlantStore.update({ ...values, id: this.state.userId });
        }
    
        await this.getAll();
        this.setState({ modalVisible: false });
        form!.resetFields();
        });
    };
    delete(input: EntityDto) {
        this.props.materialPlantStore.delete(input);
        this.getAll()
    }

    render() {
        const {plant} = this.props.materialPlantStore
        const columns = [
            { title: L('plant Name'), dataIndex: 'plantName', key: 'plantName' ,width:150 , render: (text: string) => <div>{text}</div>},
            { title: L('description'), dataIndex: 'description', key: 'description', width:100,
                render: (text: number  ) => <div >{text} </div> },
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
        
            const myForm = (
                <Tabs defaultActiveKey={"MaterialPlant"} size="small"  tabBarGutter={64}>
                    <Tabs.TabPane tab ={'Material Plant'} key={"MaterialPlant"}>
                        <Form.Item label={L('Plant Name')} {...formItemLayout} name={'plantName'} >
                            <Input 
                                        placeholder={L("input Plant")}
                                    />
                        </Form.Item>
                        <Form.Item label={L('description')} {...formItemLayout} name={'description'} >
                            <Input.TextArea  
                                    style={{ height: 120, resize: 'none' }} 
                                    placeholder={L("input Description")}
                                    maxLength={1024}
                                    />
                        </Form.Item>
                    </ Tabs.TabPane> 
                </Tabs>
            )
        
        return(
            <Card>
                <TableComponent

                    columns ={columns}
                    datarow= { plant}
                    handleCreate={() => this.createOrupdateModalOpen({id:0})}
                    handleExportExcel={() => {}}
                    handleExportFilePdf={() => {}}
                    handleImport={() =>{}}
                    handleOnRow={() => {}}
                    handleSearch={() =>{}}

                    DisableAdd= {true}
                    handleTableChangePagination={() => {}}
                    title='Plant'
                />

            <CreateOrUpdateComponent 
                    formRef={this.formRef}
                    visible={this.state.modalVisible}
                    onCancel={() => this.setState({
                        modalVisible :false
                    })}
                    onCreate={this.handleCreate}
                    footer ={undefined }
                    form={myForm}
                    width={500}
                    className=""
                    
                />
            </Card>
        )

        
    }
}

export default Plant