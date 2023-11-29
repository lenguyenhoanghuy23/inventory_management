import React from "react";
import AppComponentBase from "../../components/AppComponentBase";
import materialGroupStore from "../../stores/MaterialGroupStore";
import { inject ,observer} from "mobx-react";
import Stores from "../../stores/storeIdentifier";
import Form, { FormInstance } from "antd/lib/form";
import TableComponent from "../../components/Table";
import Menu from "antd/lib/menu";
import { SettingOutlined } from "@ant-design/icons";
import { Dropdown, Button, Input, Tabs } from "antd";
import { L } from "../../lib/abpUtility";
import { EntityDto } from "../../services/dto/entityDto";
import CreateOrUpdateComponent from "../../components/CreateOrUpdate";
import { formItemLayout } from "../formLayout";


export interface IProps{
    materialGroupStore :materialGroupStore
}

@inject(Stores.MaterialGroupStore)
@observer

class MaterialGroup extends AppComponentBase<IProps> {
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
        await this.props.materialGroupStore.getAll()
    }

    handleTableChange = (pagination: any) => {
        this.setState({ skipCount: (pagination.current - 1) * this.state.maxResultCount! }, async () => await this.getAll());
      };
  

    getData(){
        const {mGroup} = this.props.materialGroupStore
        const rs = mGroup?.items?.filter((x) => x )
        console.log(rs);
        
        return {items:rs ,totalCount:mGroup?.totalCount}
    }

    Modal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible,
        });
    };

    async createOrupdateModalOpen(entityDto: EntityDto) {
        if (entityDto.id === 0) {
            await this.props.materialGroupStore.CreateMaterialGroup();
        } else {
            await this.props.materialGroupStore.get(entityDto);
            
        }
        this.setState({ userId: entityDto.id });
        this.Modal();
        setTimeout(() => {
            this.formRef.current?.setFieldsValue({ ...this.props.materialGroupStore.edit });
        }, 100);
    }

    handleCreate =async ()=>{
        const form =  this.formRef.current;
        form!.validateFields().then(async (values:any) =>{
            console.log(values);
            
            if (this.state.userId == 0) {
                await this.props.materialGroupStore.create(values)
            }
            else{
                console.log(this.state.userId);
                
                await this.props.materialGroupStore.update({...values, id:this.state.userId})
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
        self.props.materialGroupStore.delete(input);
        await this.getAll()
    }
    render() {
        const columns = [
            { title: L('material Group'), dataIndex: 'materialGroup', key: 'materialGroup' , render: (text: string) => <div>{text}</div> },
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

        
        const myForm = (
            <Form ref={ this.formRef}>
                <Tabs defaultActiveKey={"materialGroup"} size="small"  tabBarGutter={64} >
                    <Tabs.TabPane tab ={'material Group'} key={"materialGroup"}>
                        <Form.Item label={L('transaction Group')} {...formItemLayout} name={'materialGroup'} >
                            <Input 
                                        placeholder="nhập transactionType"
                                    />
                        </Form.Item>
                        <Form.Item label={L('description')} {...formItemLayout} name={'description'} >
                            <Input.TextArea  
                                    style={{ height: 120, resize: 'none' }} 
                                    placeholder="nhập mô tả"
                                    maxLength={1024}
                                    />
                        </Form.Item>
                    </ Tabs.TabPane> 
                </Tabs>
            </Form>
        
        )
        return(
            <div>
                <TableComponent
                    datarow ={this.getData()}
                    columns={columns}
                    title="Material Group"
                    handleCreate={() => this.createOrupdateModalOpen({id:0})}
                    handleExportFilePdf ={() =>{}}
                    handleExportExcel ={() => {}}
                    handleOnRow ={ () => {}}
                    handleSearch ={() => {}}
                    handleImport={ () => {}}
                    DisableAdd= {false}
                    handleTableChangePagination={() => {}}

                />

                <CreateOrUpdateComponent 
                    formRef={this.formRef}
                    footer ={undefined }
                    visible={this.state.modalVisible}
                    onCancel={() => this.setState({
                        modalVisible :false
                    })}
                    onCreate={this.handleCreate}
                    form={myForm}
                    width={500}
                    className=""
                
                />
            </div>
        )
    }
}   

export default MaterialGroup




