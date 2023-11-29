
import React from "react";
import AppComponentBase from "../../components/AppComponentBase";
import goodReceiptStore from "../../stores/goodReceiptStore";
import { inject, observer } from "mobx-react";
import Stores from "../../stores/storeIdentifier";
import { FormInstance } from "antd/lib/form";
import { EntityDto } from "../../services/dto/entityDto";
import CreateOrUpdateComponent from "../../components/CreateOrUpdate";
import goodIssuesStore from "../../stores/goodIssuesStrore";
import { Modal, Tag } from "antd";
import { L } from "../../lib/abpUtility";
import MaterialTransactionStore from "../../stores/materialTransactionStore";
import { GetGoodIssuesOutput } from "../../services/GoodIssues/dto/GoodIssuesDto";
import _ from "lodash";
import { error, success, warning } from "../../components/MessageApi/messageApi";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { autorun } from "mobx";
import provOrgStore from "../../stores/provOrgStore";
import materialIventoryStore from "../../stores/materialIventoryStore";
import NestesTableComponent from "../../components/Nestedtables/NestedtablesComponent";



const confirm = Modal.confirm;
export interface IProps{
    goodReceiptStore:goodReceiptStore,
    goodIssuesStore:goodIssuesStore,
    materialTransactionStore: MaterialTransactionStore,
    provOrgStore: provOrgStore,
    materialIventoryStore:materialIventoryStore,

}

export interface IState {
    modalVisible: boolean,
    maxResultCount: number,
    skipCount: number,
    userId: number,
    filter: string,
    toPlant:string
    temporaryData:Array<any>,
    OrganizationUnitId:number
    FromPlant:string
}
@inject(Stores.GoodReceiptStore ,
        Stores.GoodIssuesStore ,
        Stores.MaterialTransactionStore ,
        Stores.MaterialIventoryStore,
        Stores.ProvOrgStore)
@observer
class goodReceipts extends AppComponentBase<IProps,IState>{
    formRef = React.createRef<FormInstance>();
    state = {
        modalVisible: false,
        maxResultCount: 10,
        skipCount: 0,
        userId: 0,
        filter: "",
        toPlant:"",
        temporaryData:[],
        OrganizationUnitId:0,
        FromPlant:"",
    };
    async componentDidMount() {
        autorun(() => {
            const {selectedlabel , selectedValues} =  this.props.provOrgStore 
            this.getAllWithOrg(selectedlabel, selectedValues)
        })
    }
    async getAll() {
        await this.props.materialIventoryStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter ,OrganizationUnitId:this.state.OrganizationUnitId });
        await this.props.goodReceiptStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter ,toPlant:this.state.toPlant });
        await this.props.goodIssuesStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter ,FromPlant:this.state.FromPlant });
        await this.props.materialTransactionStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter , OrganizationUnitId:this.state.OrganizationUnitId });

    }
    getAllWithOrg = async ( selectedlabel : string , selectedValues:number ) =>  {
        if (selectedlabel === undefined) {
            this.setState({ toPlant: "" }, async () => {
                await this.getAll();
            });
            warning("Please select an organization to view")
            return;
        }
        this.setState({ toPlant: selectedlabel  , OrganizationUnitId: selectedValues}, async () => {
            await this.getAll();
        });
    }

    Modal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible,
        });
    };
    createOrupdateModalOpen  = async (entityDto: EntityDto) => {
        if (entityDto.id === 0) {
            await this.props.goodReceiptStore.createReceipt();
        } else {
            // await this.props.goodReceiptStore.get(entityDto);
        }
        this.setState({ userId: entityDto.id });
        this.Modal();
        setTimeout(() => {
            this.formRef.current?.setFieldsValue({ ...this.props.goodReceiptStore.edit });
        }, 100);
    }

    handleCreate =async ()=>{
        const form =  this.formRef.current;
        const {selectedValues} =  this.props.provOrgStore
        form!.validateFields().then(async (values:any) =>{
            if (this.state.userId == 0) {
                console.log(values.id , values.materialNumber, selectedValues);

                //await this.props.materialIventoryStore.createIventory()
                //await this.props.goodReceiptStore.create(values)
            }
            else{
                await this.props.goodReceiptStore.update({...values, id:this.state.userId})
            }
            await this.getAll()
            this.setState({
                modalVisible : false
            })
            form?.resetFields();
        })
    }
    // handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     e.persist()
    //     var value =  e.target?.value
    //     this.setState({ filter: value }, async () => {
    //         await this.getAllTransaction();
    //     });
    //     this.setState({ filter: value} , async () => { await this.getAllIssues()} );
    // }

    handleSearch = _.debounce(async(e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist()
        const value = e.target?.value
        this.setState({ filter: value}, async () => {
            await this.getAll()
        });
    }, 500, { leading: true });

    confirmIssues = async (TranId:EntityDto , TransQuality:any , Total:any , materialNumber:any , fromPlant:any ,toplant:any,type:any ) => {
        const {  selectedValues} = this.props.provOrgStore
        if (Total.Total < TransQuality.TransQuality) {
            return error("total is less than quality")
        }
        if (Total.Total > TransQuality.TransQuality) {
            return error("total is more than quality")
        }
        const sendData ={
            id:0,
            transactionID:TranId.id,
            organizationUnitId:selectedValues
        }
        const sendInvnentory ={
            id:0,
            materialNumber:materialNumber.materialNumber,
            fromPlant:fromPlant.fromPlant,
            toPlant:toplant.toplant,
            type:type.type,
            organizationUnitId:selectedValues
        }

        console.log(sendInvnentory);

        const  handleConfirm  = async () => {
            await this.props.goodReceiptStore.create(sendData)
            await this.props.materialIventoryStore.create(sendInvnentory) // sau khi Receipt confirm thi nguyen lieu se duoc dua vao kho(inventory)
            await this.props.goodReceiptStore.updateIssues({transactionId:TranId.id, id:0}) // update isOnhandsProcessed khi Recipt da confirm
            await this.props.goodReceiptStore.updateTrans({transactionId:TranId.id, id:0}) // update isOnhandsProcessed khi Recipt da confirm
            this.setState({
                modalVisible : false
            })
            await this.getAll()
        }
        confirm({
            title: L('Do you want to confirm these items?'),
            async onOk() {
                await handleConfirm();
                
                return success("add successfully")
            },
            onCancel() {
                console.log('Cancel');
            },
        });
        
    }

    handleConfirm (){
    }

    handleOnRow = async (id:EntityDto )=>{
        this.Modal()
        await this.props.goodIssuesStore.getTransactionById(id)  
        const rs =  this.props.goodIssuesStore.editTransaction
        this.setState({
            userId:id.id,
            temporaryData:[rs]

        }) 
    }   
    showHeader() {
        const columns = [
          {
            dataIndex: [ 'isCompleted','docmentType', 'fromPlant', 'fromSubLocation', 'toPlant', 'toSubLocation' ,],
            render: (text: string, record: any) => (
              <div style={{ fontSize :"16px"}}>
                {
                    // neu isComleted === true thi them CheckCircleOutlined vao
                    record?.isCompleted === true ? (
                        < >
                            <span> {record.docmentType} - {record.fromPlant}  - {record.fromSubLocation} - {record.toPlant}- {record.toSubLocation}  </span>
                            <span style={{color: "#23fa35" }} >{<CheckCircleOutlined />}</span>
                        </>
                    )
                    : (
                         // neu isComleted === false thi them CloseCircleOutlined vao
                        < >
                            <span> {record.docmentType} - {record.fromPlant} - {record.fromSubLocation} - {record.toPlant}- {record.toSubLocation}  </span>
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
        const { receipt } = this.props.goodReceiptStore;
        const parentItems = receipt?.items?.filter((item) => {
            return  item.id === transId
        } );    
        parentItems?.forEach((parent) => {
            const totalIssueQuantity = parent.children?.reduce((total, child) => total + child.receiptQuantity, 0);
            parent.total = totalIssueQuantity;
        });
        return { items:parentItems, totalCount: receipt?.totalCount };
    }
    getTransactionByIssues = () =>{
        const rs =  this.state.temporaryData
        rs?.forEach((parent:GetGoodIssuesOutput) => {
            const totalIssueQuantity = parent.children?.reduce((total, child) => total + child.issueQuantity, 0);
            parent.total = totalIssueQuantity;
        });
        return rs
    }
    getReceipt () {
        const { receipt } = this.props.goodReceiptStore;
        const {userId} = this.state
        const result =  receipt?.items?.filter((x) => x?.id === userId)
        return {items:result , totalCount:1 }         
    }
   
    render() {
        const { receipt } = this.props.goodReceiptStore;
        const columnsTransaction = [
            {   
                title: L('transactionType'), 
                dataIndex: 'transactionType',key: 'transactionType', 
                render: (text: string ) => <div>{text}</div> ,
               
            },
            {   
                title: L('materialNumber'), 
                dataIndex: 'materialNumber',key: 'materialNumber', 
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
            {   
                
               ...this.state.modalVisible ?{
                    title: L('action'),
                    dataIndex: 'action',
                    key: 'action',
                    render: (_text: string, item: any) =>
                    item.isCompleted === false ? (
                        <a
                        onClick={() =>
                            this.confirmIssues(
                            { id: item.id },
                            { TransQuality: item.transactionQuantiry },
                            { Total: item.total },
                            { materialNumber: item.materialNumber },
                            {fromPlant:item.fromPlant},
                            {toplant:item.toPlant},
                            {type:item.transactionType}
                            )
                        }
                        >
                        {L('Confirm')}
                        </a>
                    ): null,
               }: null,
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
            
        ]

        const columnsReceipt =[
            {   
                title: L('receiptType'), 
                dataIndex: 'receiptType',key: 'receiptType', 
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
                title: L('receiptQuantity'), 
                dataIndex: 'receiptQuantity',key: 'receiptQuantity', 
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
            
        ]
        return(
            <div>
                <NestesTableComponent
                    columnsHeader={this.showHeader()}
                    dataSourceHeader={receipt}
                    columnsParent={columnsTransaction}
                    dataSourceParent={(id:any) => this.getTransaction(id)}
                    columnsChildren={columnsReceipt}
                    handleOnRow={(item:EntityDto) => this.handleOnRow({id:item.id})}
                />
                <CreateOrUpdateComponent
                    formRef={this.formRef}
                    visible={this.state.modalVisible}
                    onCancel={() => this.setState({
                        modalVisible :false
                    })}
                    onCreate={()=>this.handleConfirm()}
                    form={undefined}
                    className=""
                    width={1400}
                    footer ={null}
                    TableModal ={ 
                        <NestesTableComponent
                            columnsHeader={this.showHeader()}
                            dataSourceHeader={this.getReceipt()}
                            columnsParent={columnsTransaction}
                            dataSourceParent={this.getTransactionByIssues}
                            columnsChildren={columnsIssues}
                            handleOnRow={() => {}}
                        
                        />
                    }
                 />
            </div>
        )
    }
}

export default goodReceipts


