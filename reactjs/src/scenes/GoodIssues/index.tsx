import React from "react";
import AppComponentBase from "../../components/AppComponentBase";
import goodIssuesStore from "../../stores/goodIssuesStrore";
import { inject, observer } from "mobx-react";
import Stores from "../../stores/storeIdentifier";
import   Form, { FormInstance } from "antd/lib/form";
import { EntityDto } from "../../services/dto/entityDto";
import { L } from "../../lib/abpUtility";
import CreateOrUpdateComponent from "../../components/CreateOrUpdate";
import _ from "lodash";
import MaterialTransactionStore from "../../stores/materialTransactionStore";
import "../../Style/Style.css"
import { Input, Modal, Tabs, Tag } from "antd";

import provOrgStore from "../../stores/provOrgStore";
import { autorun } from "mobx";

import { warning } from "../../components/MessageApi/messageApi";

import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import NestesTableComponent from "../../components/Nestedtables/NestedtablesComponent";
import { GetGoodIssuesOutput } from "../../services/GoodIssues/dto/GoodIssuesDto";

const confirm = Modal.confirm;

export interface IProps{
    goodIssuesStore:goodIssuesStore,
    materialTransactionStore: MaterialTransactionStore
    provOrgStore: provOrgStore,
}

export interface IState {
    modalVisible: boolean,
    maxResultCount: number,
    skipCount: number,
    userId: number,
    filter: string,
    totalQuality:number,
    description:string,
    temporaryData:Array<any>,
    parentId:number
    FromPlant :string,
    items:string[]

}
@inject(Stores.GoodIssuesStore , Stores.MaterialTransactionStore ,Stores.ProvOrgStore )
@observer
class GoodIssues extends AppComponentBase<IProps ,IState>{
    formRef = React.createRef<FormInstance>();
    state = {
        modalVisible: false,
        maxResultCount: 10,
        temporaryData:[],
        skipCount: 0,
        userId: 0,
        description:"",
        totalQuality:0,
        filter: '',
        parentId:0,
        FromPlant :"",
        items:["id","transactionNumber","transactionType","materialNumber","transactionQuantiry","materialLot","materialType","fromPlant","fromSubLocation","toPlant","toSubLocation","docmentType","total","isCompleted"]
       
    };
    async componentDidMount() {
        // -----------reaction chỉ được thực thi sự kiện đó khi được cho phép -------------//
        autorun(() => {
            const {selectedValues , selectedlabel} =  this.props.provOrgStore
            this.getAllWithOrg(selectedValues , selectedlabel)
        })
    }
    async getAll() {
        // await this.props.materialTransactionStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter , OrganizationUnitId:this.state.OrganizationUnitId});
        await this.props.goodIssuesStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter , FromPlant:this.state.FromPlant });
    }
    getAllWithOrg = async ( selectedValues : number , selectedlabel :string) =>  {
        if (selectedValues === undefined) {
            this.setState({ FromPlant: "" }, async () => {
                await this.getAll();
            });
            warning("Please select an organization to view")
            return;
        }
        this.setState({ 
            FromPlant: selectedlabel
        }, async () => {
            await this.getAll();
        });
    }

    handleTableChange = (pagination: any) => {
        this.setState({ skipCount: (pagination.current - 1) * this.state.maxResultCount! }, async () => await this.getAll());
    };

    Modal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible,
        });
    };
    createOrupdateModalOpen  = async (entityDto: EntityDto) => {
        console.log( entityDto);
        if (entityDto.id === 0) {
            await this.props.goodIssuesStore.createIssues();
        } else {
            await this.props.goodIssuesStore.get(entityDto);
        }
        this.setState({ userId: entityDto.id });
        this.Modal();
        setTimeout(() => {
            this.formRef.current?.setFieldsValue({ ...this.props.goodIssuesStore.edit });
        }, 100);
    }
    handleCreate =async ()=>{
        const form =  this.formRef.current;
        const {userId , description} = this.state
        console.log(description);
        
        form!.validateFields().then(async (values:any) =>{
            if (userId !== 0 && description === "parent" ) {
                console.log( values);
                const sendData ={
                    id:values.id,
                    issueQuantity: values.issueQuantity,
                    isOnhandsProcessed: true,
                    transactionID:userId,
                };
                await this.props.goodIssuesStore.create(sendData)
            }
            if (this.state.userId !== 0 && description === "child"){
                const sendData ={
                    id:userId,
                    issueQuantity: values.issueQuantity,
                };
                console.log(sendData );
                await this.props.goodIssuesStore.update(sendData)
            }
            await this.getAll()  
            this.setState({
                modalVisible : false, 
            })
            form?.resetFields();
        })
    }

    handleSearchTransaction = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist()
        var value =  e.target?.value
        this.setState({ filter: value}, async () => {await  this.getAll()});   
    }

    handleSearch = _.debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target?.value
        this.setState({ filter: value}, async () => {
            await  this.getAll()
            console.log(this.state.filter);
        });
    }, 500, { leading: true });

    handleOnRow = async (id:EntityDto, type: any )=>{
        if (type.type === "parent") { // If is a parent , input IssuesQuality,
            this.setState({
                userId:id.id,
                description:type.type
            })
            await this.props.materialTransactionStore.get(id)
            var transaction =  this.props.materialTransactionStore.edit
            if (  transaction.isCompleted ===false ) {
                this.Modal();
            }
        }
        if (type.type === "child") { //  If is a child ,update IssuesQuality,
            await this.props.goodIssuesStore.get(id)
            var Issues =  this.props.goodIssuesStore.edit
            this.setState({
                userId:id.id,
                description:type.type
            })
            if (Issues.isOnhandsProcessed === false) {
                this.Modal();
            }
            this.formRef.current?.setFieldsValue(Issues); // sau khi lay duoc thi set len Fields
        }
    }

    delete = async (entityDto: EntityDto ) => {

        const handleDelete = async () => {
            await this.props.goodIssuesStore.delete(entityDto);
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

    handleInputKeyDown = (event:any) => {
        if (event.key === 'Enter') {
          event.preventDefault(); // Ngăn chặn hành động mặc định của phím Enter (thường là chuyển dòng mới)
          this.handleCreate(); // Gọi hàm xử lý submit form trong Modal (onOk)
        }
    };
    form() {
        return (
            <Form ref={ this.formRef} className="top"  onKeyDown={this.handleInputKeyDown} >
                <Tabs defaultActiveKey={"Transaction"} size="small"  tabBarGutter={64}>
                    <Tabs.TabPane tab ={'Transaction'} key={"Transaction"}> 
                        <Form.Item label={L('issueQuantity')}  name={'issueQuantity'} >
                            <Input 
                                placeholder={L("issueQuantity")}
                                className="sizeInput-border text"
                                autoFocus
                            />
                        </Form.Item>
                    </Tabs.TabPane>
               
                </Tabs>
            </Form>
        )
    }

    
    showHeader() {
        const columns = [
          {
            dataIndex: ['docmentType', 'fromPlant', 'fromSubLocation', 'toPlant', 'toSubLocation', 'total', 'transactionQuantiry'],
            render: (text: string, record: any) => (
                <div style={{ fontSize :"16px"}}>
                {
                    // neu isComleted === true thi them CheckCircleOutlined vao 
                    record?.isCompleted === true ? (
                        < >
                            <span> {record.docmentType} - {record.fromPlant}  - {record.fromSubLocation} - {record.toPlant}- {record.toSubLocation}</span> - 
                            <span style={{ color: record.total > record.transactionQuantiry ? 'red' : 'inherit' }}>{record.total}</span>/{record.transactionQuantiry }
                            <span style={{color: "#23fa35" }} >{<CheckCircleOutlined />}</span>

                        </>
                    ) 
                    : (
                        // neu isComleted === false thi them CloseCircleOutlined vao 
                        < >
                            <span> {record.docmentType} - {record.fromPlant} - {record.fromSubLocation} - {record.toPlant}- {record.toSubLocation}-</span>
                            <span 
                                style={{ color: record.total > record.transactionQuantiry ? 'red' : record.total < record.transactionQuantiry ? 'black' : '#067323' }}
                            >
                                    {record.total}/{record.transactionQuantiry}
                            </span>
                            <span style={{color: "#d42424"}} >{<CloseCircleOutlined />}</span>

                        </>
                    )
                }
                </div>
            ),
          },
        ];
        return columns;
    }
    getTransaction(transId:number) {
        const { issues } = this.props.goodIssuesStore;
        const parentItems = issues?.items?.filter((item:GetGoodIssuesOutput) => {
            return  item.id === transId
        } );
        parentItems?.forEach((parent) => {
            const totalIssueQuantity = parent.children?.reduce((total, child) => total + child.issueQuantity, 0);
            parent.total = totalIssueQuantity;
        });
        console.log( parentItems);
        
        return { items:parentItems, totalCount: issues?.totalCount };
    }
    getheader(){
        const { issues } = this.props.goodIssuesStore;
        const parentItems = issues?.items?.filter((item:GetGoodIssuesOutput) => {
            return  item
        } );
        parentItems?.forEach((parent) => {
            const totalIssueQuantity = parent.children?.reduce((total, child) => total + child.issueQuantity, 0);
            parent.total = totalIssueQuantity;
        });
        console.log( parentItems);

        return parentItems
    }
    render() {
        const columnsTransaction = [
            {   
                title: L('materialNumber'), 
                dataIndex: 'materialNumber',key: 'materialNumber', 
                render: (text: string ) => <div>{text}</div> ,
               
            },
            {   
                title: L('transactionType'), 
                dataIndex: 'transactionType',key: 'transactionType', 
                render: (text: string) => <div>{text}</div> 
            },
            {   
                title: L('transactionQuantiry'), 
                dataIndex: 'transactionQuantiry',key: 'transactionQuantiry', 
                render: (text: string , record:any ) => (
                    <div>
                        { record.total +"/"+text}
                    </div>
                ),
            },
            {   
                title: L('materialLot'), 
                dataIndex: 'materialLot',key: 'materialLot', 
                render: (text: string) => <div>{text}</div> 
            },
            {   
                title: L('fromPlant'), 
                dataIndex: 'fromPlant',key: 'fromPlant', 
                render: (text: string) => <div>{text}</div> 
            },
            {   
                title: L('fromSubLocation'), 
                dataIndex: 'fromSubLocation',key: 'fromSubLocation', 
                render: (text: string) => <div>{text}</div> 
            },
            {   
                title: L('toPlant'), 
                dataIndex: 'toPlant',key: 'toPlant', 
                render: (text: string) => <div>{text}</div> 
            },
            {   
                title: L('toSubLocation'), 
                dataIndex: 'toSubLocation',key: 'toSubLocation', 
                
                render: (text: string) => <div>{text}</div> 
            },
            {   
                title: L('docmentType'), 
                dataIndex: 'docmentType',key: 'docmentType', 

                render: (text: string) => <div>{text}</div> 
            },
            {   
                title: L('isCompleted'), 
                dataIndex: 'isCompleted',key: 'isCompleted', 
               
                render: (text: boolean) => (text === false ? <Tag color="#ff1303">{L('Not Yet')}</Tag> : <Tag color="#2db7f5">{L('completed')}</Tag>),
            },
        ];
        
        const columnsIssues =[
            {   
                title: L('issuesType'), 
                dataIndex: 'issuesType',key: 'issuesType', 
                render: (text: string) => <div>{text}</div> 
            },
            {   
                title: L('materialNumber'), 
                dataIndex: 'materialNumber',key: 'materialNumber', 
                render: (text: string ) => <div>{text}</div> 
            },
            {   
                title: L('transaction'), 
                dataIndex: 'transaction',key: 'transaction', 
                render: (text: string) => <div>{text}</div> 
            },
            {   
                title: L('issueQuantity'), 
                dataIndex: 'issueQuantity',key: 'issueQuantity', 
                render: (text: string) => <div>{text}</div> 
            },
            {   
                title: L('materialType'), 
                dataIndex: 'materialType',key: 'materialType', 
                render: (text: string) => <div>{text}</div> 
            },
            {   
                title: L('materialLot'), 
                dataIndex: 'materialLot',key: 'materialLot', 
                render: (text: string) => <div>{text}</div> 
            },
            {   
                title: L('plant'), 
                dataIndex: 'plant',key: 'plant', 
                render: (text: string) => <div>{text}</div> 
            },
            {   
                title: L('subLocation'), 
                dataIndex: 'subLocation',key: 'subLocation', 
                render: (text: string) => <div>{text}</div> 
            },
            {   
                title: L('isOnhandsProcessed'), 
                dataIndex: 'isOnhandsProcessed',key: 'isOnhandsProcessed', 
                render: (text: boolean) => (text === false ? <Tag color="#ff1303">{L('Not Yet')}</Tag> : <Tag color="#2db7f5">{L('completed')}</Tag>),
            },
            {
                title: L("Action"),
                dataIndex:"action",
                key:"action",
                render: (_: string, item: any) => (
                    <div>
                        {
                            item.isOnhandsProcessed == false ? 
                                <span  
                                    className="link-span"
                                    onClick={() => this.delete({ id: item.id })}>{L('Delete')}
                                </span> 
                            :null
                        }           
                    </div>
                ),
            },

        
        ]
        return(
            <div>
               <NestesTableComponent
                    columnsHeader={this.showHeader()}
                    dataSourceHeader={this.getheader()}
                    columnsParent={columnsTransaction}
                    dataSourceParent={(id:any) => this.getTransaction(id)}
                    columnsChildren={columnsIssues}
                    handleOnRow={(items:EntityDto, type: any) => this.handleOnRow({id:items.id } ,{type})}
               />
                <CreateOrUpdateComponent
                    footer ={undefined }
                    formRef={this.formRef}
                    visible={this.state.modalVisible}
                    onCancel={() => this.setState({
                        modalVisible :false
                    })}
                    onCreate={this.handleCreate}
                    form={ this.form()}
                    className="modal-center"
                    width={500}
                />
            </div>
        )
    }
}

export default GoodIssues



// <NestedtablesComponent
// columnsParent={this.columnsParent()}
// columnschildren={this.columnsChild()}
// Columnsheader={this.showHeader()}
// dataSourceparent={(id:any) => this.onGetDataParent(id) }
// dataSource={transaction}
// dataSourcechildren={(id:any) => this.onGetDataChild(id)}
// onClick={() => this.createOrupdateModalOpen({id:0})}
// handleSearch = {(e: React.ChangeEvent<HTMLInputElement>) =>this.handleSearch(e)}
// handleOnRow = {(item :EntityDto , des:any) => this.handleOnRow({ id:item.id } ,{des} ) }
// showheader="GoodsIssues"
// />