import React from "react";
import AppComponentBase from "../../components/AppComponentBase";
import organizationUnitStore from "../../stores/organizationUnitStore";
import { inject, observer } from "mobx-react";
import Stores from "../../stores/storeIdentifier";
import Form, { FormInstance } from "antd/lib/form";
import TableComponent from "../../components/Table";
import { SettingOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Button, Input, Tabs } from "antd";
import { L } from "../../lib/abpUtility";
import CreateOrUpdateComponent from "../../components/CreateOrUpdate";
import { EntityDto } from "../../services/dto/entityDto";

export interface Iprops{
    organizationUnitStore: organizationUnitStore
}

@inject(Stores.OrganizationUnitStore)
@observer
class OrganizationUnit extends AppComponentBase<Iprops>{
    formRef = React.createRef<FormInstance>();
    state = {
        modalVisible: false,
        maxResultCount: 10,
        skipCount: 0,
        userId: 0,
        filter: '',
        desCoU:"",
    };

    async componentDidMount() {
        await this.getAll();
    }
    async getAll() {
        await this.props.organizationUnitStore.getAll();
    }
    handleTableChange = (pagination: any) => {
        this.setState({ skipCount: (pagination.current - 1) * this.state.maxResultCount! }, async () => await this.getAll());
      };

    Modal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible,
        });
    };
    createOrupdateModalOpen  = async (entityDto: EntityDto , des:any) => {
        this.setState({desCoU:""}) // set lại desCoU = rỗng 
        if (entityDto.id === 0 && des.des ==="create") { // nếu des bằng create => tạo root 
            await this.props.organizationUnitStore.createOU();
            this.setState({ userId: entityDto.id , desCoU:des.des});
        } 
        if (entityDto.id !== 0 && des.des ==="children") { // nếu des bằng child =>  tạo child
            await this.props.organizationUnitStore.createOU();
            this.setState({ userId: entityDto.id ,desCoU:des.des});
        } 
        if(entityDto.id !== 0 && des.des ==="update") { // nếu des bằng update => update lại display name
            await this.props.organizationUnitStore.get(entityDto);
            this.setState({ userId: entityDto.id ,desCoU:des.des});
        }
        this.Modal();
       
        setTimeout(() => {
            this.formRef.current?.setFieldsValue({ ...this.props.organizationUnitStore.edit });
        }, 100);
    }
    handleCreate =async ()=>{
        const form =  this.formRef.current;
        const{desCoU , userId} = this.state

        console.log("des",desCoU + ","+ "Id",userId);
        
        form!.validateFields().then(async (values:any) =>{
            if (userId == 0 && desCoU ==="create") {
                const sendData = {
                    id:0,
                    displayName:values.displayName,
                    parentId :0
                }
                await this.props.organizationUnitStore.create(sendData)
            }
            if (userId != 0 && desCoU==="children") {
                const sendData = {
                    id:0,
                    displayName:values.displayName,
                    parentId :userId
                }
                await this.props.organizationUnitStore.create(sendData)
            }
            if (userId!== 0 && desCoU==="update"){ 
                await this.props.organizationUnitStore.update({...values, id:this.state.userId})
               
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
        await self.props.organizationUnitStore.delete(input);
        this.getAll()
    }
    getData(){
        const {orgUnit} = this.props.organizationUnitStore
        const rs = orgUnit?.items?.filter((x) => x && x !== null)
        return {items:rs ,totalCount:orgUnit?.totalCount}
    }
    render() {
      
        const columns = [
            {   
                title: L('display Name'), 
                dataIndex: 'displayName',key: 'displayName', 
                editable: true,
                render: (text: string) => <div>{text}</div> 
            },
            {
                title: L('Actions'),
                editable: true,
                render: (text: string, item: any) => (
                <div>
                    <Dropdown
                        trigger={['click']}
                        overlay={
                            
                            <div>
                                <Menu>
                                    <Menu.Item onClick={() => this.createOrupdateModalOpen({id :item.id} ,{des:"update"})} >{L('edit')}</Menu.Item>
                                    <Menu.Item onClick={() => this.createOrupdateModalOpen({id :item.id} ,{des:"children"})} >{L('Add Children')}</Menu.Item>
                                    <Menu.Item onClick={() => this.delete({id:item.id})}>{L('Delete')}</Menu.Item>
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

        const myForm = (
          
            <Form ref={ this.formRef}>
                <Tabs defaultActiveKey={"OrganizationUnit"} size="small"  tabBarGutter={64}>
                    <Tabs.TabPane tab ={'Organization Unit'} key={"OrganizationUnit"}>
                        <Form.Item label={L('display Name')} {...formItemLayout} name={'displayName'} >
                            <Input 
                                        placeholder="nhập display Name"
                                    />
                        </Form.Item>
                    </ Tabs.TabPane> 
                </Tabs>
            </Form>
        )

        
        return(
            <div>
                <TableComponent
                    columns={columns}
                    datarow={this.getData()}
                    handleCreate={() => this.createOrupdateModalOpen({id:0} ,{des:'create'})}
                    handleExportExcel={() => {}}
                    handleExportFilePdf={() => {}}
                    handleImport={() => {}}
                    handleOnRow={() => {}}
                    handleSearch={() => {}}
                    DisableAdd= {false}
                    handleTableChangePagination={() => {}}
                    title="Organization "
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
                    className=".modal-center"
                    width={500}
                />
            </div>
        )
    }
}

export default OrganizationUnit


const formItemLayout = {
    labelCol: {
        xs: { span: 6 },
        sm: { span: 6 },
        md: { span: 6 },
        lg: { span: 6 },
        xl: { span: 6 },
        xxl: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 18 },
        sm: { span: 18 },
        md: { span: 18 },
        lg: { span: 18 },
        xl: { span: 18 },
        xxl: { span: 18 },
    },
};
