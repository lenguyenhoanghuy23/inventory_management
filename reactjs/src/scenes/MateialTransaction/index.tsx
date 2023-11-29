
import React from "react";
import AppComponentBase from "../../components/AppComponentBase";
import MaterialTransactionStore from "../../stores/materialTransactionStore";
import Form, { FormInstance } from "antd/lib/form";
import TableComponent from "../../components/Table";

import { message, Tabs, Tag, Modal, Row, Col, Input, Button, Select, TreeSelect } from "antd";
import { L } from "../../lib/abpUtility";
import { inject, observer } from "mobx-react";
import Stores from "../../stores/storeIdentifier";
import { EntityDto } from "../../services/dto/entityDto";
import CreateOrUpdateComponent from "../../components/CreateOrUpdate";
import { read, utils } from "xlsx";
import '../../scenes/MaterialMasterData/index.css'
import TableModal from "../../components/TableModal";
import  Radio, { RadioChangeEvent } from "antd/lib/radio";
import { debounce } from "lodash";
import "../../Style/Style.css"
import { Columns, filterColumnItems } from "../../components/ColumnsAndFormComponent/ColumnsComponent";

import provOrgStore from "../../stores/provOrgStore";
import {  IReactionDisposer, autorun } from "mobx";
import { warning } from "../../components/MessageApi/messageApi";
import { PlusOutlined } from "@ant-design/icons";
import { GetType, GetAssigment, GetOrganization } from "../../services/MaterialTransaction/Dto/materialTransactionDto";

const confirm = Modal.confirm;
interface DataType {
    id: number,
    transactionNumber:string,
    transactionType: string,
    materialNumber: string,
    transactionQuantiry: number,
    materialLot: string,
    fromPlant:string,
    fromSubLocation: string,
    toPlant: string,
    toSubLocation: string,
    docmentType: string,
    organizationUnitId:number,
}

export interface IProps{
    materialTransactionStore: MaterialTransactionStore,
    provOrgStore: provOrgStore,
   
}

interface Children {
    title: string;
    value: string;
    children: Children[];
}
  

export interface IState {
    modalVisible: boolean,
    maxResultCount: number,
    skipCount: number,
    userId: number,
    key:number,
    filter: any,
    OrgId :number,
    temporaryData:DataType[],
    IdIncrease :number;
    isCheck:boolean
    docmentType: string | undefined,
    inputValue: string
    TableVisble: string,
    items:string[]
}

@inject(Stores.MaterialTransactionStore , Stores.ProvOrgStore)
@observer
class MaterialTransaction extends AppComponentBase<IProps , IState> {
    formRef = React.createRef<FormInstance>();
    asyncTask: IReactionDisposer | null = null;
    state = {
        isCheck:true,
        modalVisible: false,
        TableVisble: "", // set TableVisble ="none" khi update  ngc lại là " " khi create để ẩn hoặc hiện table
        maxResultCount: 10,
        skipCount: 0,
        userId: 0,
        OrgId:0,
        key:0,
        filter: '',
        temporaryData:[],
        IdIncrease :0,
        docmentType:"",
        inputValue :"",
        items:["id","transactionNumber","transactionType","materialNumber","transactionQuantiry","materialLot","materialType","fromPlant","fromSubLocation","toPlant","toSubLocation","docmentType","total","isCompleted"]
    };
    async componentDidMount() {
        this.asyncTask = autorun(() => {
            const { selectedValues } = this.props.provOrgStore;
            this.getAllWithOrg(selectedValues);
          });
    }

    componentWillUnmount() {
        if (this.asyncTask) {
          this.asyncTask();
        }
    }

    // console.log("please select an organzation to view");
    async getAll() {
        await this.props.materialTransactionStore?.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter , OrganizationUnitId: this.state.OrgId });
        await this.props.materialTransactionStore?.getAssigment({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter , OrganizationUnitId: this.state.OrgId });
        await this.props.materialTransactionStore.getOrganization();
    }
    getAllWithOrg(selectedValues: number) {
        if (selectedValues === undefined) {
            this.setState({ OrgId: 0 }, async () => {
                await this.getAll();
            });
            warning("Please select an organization to view")
            return;
        }

        this.setState({ OrgId: selectedValues }, async () => {
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
        if (entityDto.id === 0) {
            await this.props?.materialTransactionStore?.createTransaction();
            await this.props?.materialTransactionStore?.getType();
           
            this.setState({
                TableVisble:"", 
            })
            this.Modal() 
        } else{
            await this.props?.materialTransactionStore?.getType();
            await this.props?.materialTransactionStore?.get(entityDto);
          
            
            const editDoctype = this.props?.materialTransactionStore?.edit
            this.setState({
                TableVisble:"none",
                isCheck:true,
                docmentType: editDoctype?.docmentType
            })
           
        }
        this.setState({ userId: entityDto.id });
       
        
        if ( this.props?.materialTransactionStore?.edit.isCompleted === false ) {
            this.Modal() 
        }
        
        setTimeout(() => {
            this.formRef.current?.setFieldsValue({ ...this.props?.materialTransactionStore?.edit });
        }, 100);
    }

    handleCreate =async ()=>{
        const {temporaryData } = this.state
        const form =  this.formRef.current;
        console.log("temporaryData",temporaryData);
        if (this.state.userId == 0 ) {
            if (temporaryData.length ==0 ) return message.warning("data rỗng")
            await this.props?.materialTransactionStore?.create(temporaryData)
            this.setState({
                isCheck:true,
                inputValue : '',
                temporaryData:[],
                docmentType:"",
                modalVisible : false
            })
        }
        else{
        
            form!.validateFields().then(async (values:any) =>{
                const addDocType ={...values ,docmentType:this.state.docmentType}
                console.log( addDocType );
                await this.props.materialTransactionStore?.update({...addDocType, id:this.state.userId})
            })
            await this.getAll()
        }
        await this.getAll()
        this.setState({
            modalVisible : false
        })
    }

    

    getCurrentDate =()=>{
        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getFullYear().toString();

        const formattedDate = year + month + day;
        return formattedDate
    }
    // tạo mã tự động từ 1-999999
    randomNum = () => {
        const randomNumber = Math.floor(Math.random() * 1000000);
        return randomNumber;
    }
    //  lưa dữ liệu trên form vào bảng tạm 
    handletemporaryData = () =>{
        const form =  this.formRef.current;        
        form!.validateFields().then(async (values:any) =>{
            const {temporaryData ,  IdIncrease , docmentType} = this.state;
            const {selectedValues} = this.props.provOrgStore
                console.log(selectedValues);
                
                const newItem = { ...values, id: IdIncrease + 1 , docmentType:docmentType+"-"+values.docmentType , OrganizationUnitId: selectedValues };
                console.log( newItem);
                await this.props?.materialTransactionStore?.checkValidDate(newItem) // validation data see have valid
                this.setState({
                    
                    temporaryData:[...temporaryData , newItem],
                    IdIncrease: IdIncrease + 1
                });
                if (form) {
                    const docmentTypeFieldValue = form.getFieldValue('docmentType'); //  lấy giá trị ở field "docmentType"
                    form.resetFields();
                    form.setFieldsValue({ docmentType: docmentTypeFieldValue });
                }
           
        })
    }
    

    handleCheckboxChange = (e: RadioChangeEvent) => {
        const {value} = e.target
        console.log( value);
        
        this.setState({ 
            isCheck : false,
            inputValue: value,
            docmentType:value+"-"+this.getCurrentDate(),
        });

    };

    handletemporaryDelete = (key:any) => {
        
        const newData = this.state.temporaryData.filter((item:any) =>  item.id !== key.id);
        console.log(newData);
        this.setState({
            temporaryData: [...newData]
        })
        
    };

    handleImport = async (e:any) => {
        const file = e.target.files?.[0];
        if (file) {
            const data = await file.arrayBuffer();
            const workbook = read(data);
            console.log(workbook);
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = utils.sheet_to_json(worksheet, {
                header: 1,
                defval: "",
            });
            console.log(jsonData);
        }
    }
    delete =async (entityDto:EntityDto) => {
        const self = this;
        const handleDelete = async () => {
            await self.props.materialTransactionStore?.delete(entityDto);
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
    handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target?.value;
        this.setState({ filter: value}, async () => {
            await this.getAll();
            console.log(this.state.filter);
        });
    }, 500, { leading: true });
    columnCustom (){
        const {items , modalVisible}  = this.state
        let col = Columns(items)    
        const filter = filterColumnItems(col , modalVisible === false ? [0,1 ,8 ,9 ,10,12] : [0 ,1 ,6,8, 9 ,10 , 12, 13])

        
        if (modalVisible === false) {
            filter[2] =  {
                title: L(""+col[4].title),
                dataIndex: col[4].dataIndex,
                key: col[3].key,
                render: (text: string , record:any ) => (
                    <div>
                        { record.total +"/"+text}
                    </div>
                ),
            };
            filter[7] ={
                title: L(""+col[13].title),
                dataIndex: col[13].dataIndex,
                key: col[13].key,
                render: (text: boolean) => (text === false ? <Tag color="#ff1303">{L('Not Yet')}</Tag> : <Tag color="#2db7f5">{L('completed')}</Tag>),
            }
            filter.push({
                title: L("Action"),
                dataIndex: "action",
                key: "action",
                render: (_text: string, item: any) => (
                  <div>
                        {
                            item.isCompleted === false ?<a onClick={() => this.delete({id:item.id})}>{L('Delete')}</a> : null
                        }
                  </div>
                ),
              });
        }
        filter[ modalVisible ===false ?5 :4]={
            title:'Material', 
            children:[
                {
                    title: L (""+col[7].key),
                    dataIndex: col[7].dataIndex,
                    key: col[7].key,
                    width: 120,
                },
                {
                    title: L (""+col[8].key),
                    dataIndex: col[8].dataIndex,
                    key: col[8].key,
                    width: 120,
                },
                {
                    title: L (""+col[9].key),
                    dataIndex: col[9].dataIndex,
                    key: col[9].key,
                    width: 120,
                },
                {
                    title: L (""+col[10].key),
                    dataIndex: col[10].dataIndex,
                    key: col[10].key,
                    width: 120,
                }
            ]
        }
        if (modalVisible === true) {
            filter.push({
              title: L("Action"),
              dataIndex: "action",
              key: "action",
              render: (_text: string, item: any) => (
                <div>
                  <a onClick={() => this.handletemporaryDelete({ id: item.id })}>Delete</a>
                </div>
              ),
            });
            return filter;
        }
        return filter    
    }
    getData(){
        const {transaction} = this.props.materialTransactionStore
        const rs = transaction?.items?.filter((x) => x)
        return {items:rs ,totalCount:transaction?.totalCount}
    }
    render() {
        const  docmentType =  this.state.isCheck === false ? this.state.docmentType : ""; 
        const {Type , Assignment , organization} = this.props.materialTransactionStore 
        const optType = Type.map((x:GetType) => {
            var result = { label:x.transactionType +"-"+ x?.description   , value:x.transactionType } 
            return result
        })
        const optNumber = Assignment.map((x:GetAssigment) => {
            var result ={ label:x.materialNumber +"-"+ x?.description  , value:x.materialNumber } 
            return result
        })
        const recursiveOptions = (organization: GetOrganization[]): Children[] => {
            return organization.map((x) => {
              var result: Children = { title: x.displayName, value: x.displayName, children: [] };
          
              if (x.children && x.children.length > 0) {
                result.children = recursiveOptions(x.children);
            }
              return result;
            });
        };
          
        const optPlant: Children[] = recursiveOptions(organization);
        const FormCustom = (     
            <Form ref={ this.formRef} className="top" style={{height:"325px" , width:"1450px"}}>
                <Tabs defaultActiveKey={"Transaction"} size="small"  tabBarGutter={64}>
                    <Tabs.TabPane tab ={'Transaction'} key={"Transaction"}>
                    {this.state.userId === 0 && (
                        <Row>
                            <Col span={5}>
                            <Radio.Group onChange={this.handleCheckboxChange} defaultValue={this.state.inputValue}>
                                <Radio value={"PN"}>Phiếu nhập</Radio>
                                <Radio value={"PX"}>Phiếu xuất</Radio>
                            </Radio.Group>
                            </Col>
                        </Row>
                    )}
                        <Row className="row">
                            <Col span={8}>
                                <Form.Item label={L('transactionType')}   {...tailFormItemLayout} name={'transactionType'} >
                                    <Select
                                        style={{ width: 300}}
                                        allowClear
                                        className={"sizeInput-border text"}
                                        optionLabelProp="label"
                                        placeholder={"Please select"+L("transactionType")}
                                        options={optType}
                                    />
                                </Form.Item>
                                <Form.Item label={L('materialNumber')} {...formItemLayout} name={'materialNumber'} >
                                <Select
                                        style={{ width: 300}}
                                        allowClear
                                        className={"sizeInput-border text"}
                                        optionLabelProp="label"
                                        placeholder={"Please select"+L("materialNumber")}
                                        options={optNumber}
                                    />
                                </Form.Item>
                                <Form.Item label={L('transactionQuantiry')} {...formItemLayout} name={'transactionQuantiry'} >
                                    <Input 
                                        placeholder={L("transactionQuantiry")}
                                        className="sizeInput-border text"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                            <Form.Item label={L('materialLot')} {...formItemLayout} name={'materialLot'} >
                                    <Input 
                                        placeholder={L("materialLot")}
                                        className="sizeInput-border text"
                                    />
                                </Form.Item>
                                <Form.Item label={L('fromPlant')}  {...tailFormItemLayout}  name={'fromPlant'} >
                                    <TreeSelect
                                        showSearch
                                        style={{ width: 300}}
                                        className={"sizeInput-border text"}
                                        placeholder="Please select"
                                        allowClear
                                        treeData={optPlant}
                                    />
                                </Form.Item>
                                <Form.Item label={L('fromSubLocation')} {...formItemLayout} name={'fromSubLocation'} >
                                    <TreeSelect
                                        showSearch
                                        style={{ width: 300}}
                                        className={"sizeInput-border text"}
                                        placeholder="Please select"
                                        allowClear
                                        treeData={optPlant}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                            <Form.Item label={L('toPlant')} {...formItemLayout} name={'toPlant'} >
                                    <TreeSelect
                                        showSearch
                                        style={{ width: 300}}
                                        className={"sizeInput-border text"}
                                        placeholder="Please select"
                                        allowClear
                                        treeData={optPlant}
                                    />
                                </Form.Item>
                                <Form.Item label={L('toSubLocation')} {...formItemLayout} name={'toSubLocation'} >
                                    <TreeSelect
                                        showSearch
                                        style={{ width: 300}}
                                        className={"sizeInput-border text"}
                                        placeholder="Please select"
                                        allowClear
                                        treeData={optPlant}
                                    />
                                </Form.Item>
                                <Form.Item name={"docmentType"} {...layout} label={L("docmentType")} key={"docmentType"}  rules={[{ required: true }]}>
                                    <Input readOnly={this.state.userId ===0 ? false :true} 
                                            className={"sizeInput-border text"} 
                                            placeholder={L("docmentType")} 
                                            addonBefore={docmentType} 
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Form.Item >
                                <Button 
                                    type="primary" 
                                    shape="round" 
                                    disabled ={this.state.isCheck === true ? true :false}
                                    onClick={this.handletemporaryData}
                                    icon={<PlusOutlined />}
                                    className="btn-add"
                                />
                            </Form.Item>   
                        </Row>
                    </ Tabs.TabPane> 
                </Tabs>
            </Form>
        )
        return(
            <div>
                <TableComponent
                    datarow ={this.getData()}
                    columns ={this.columnCustom()}
                    handleImport={() =>{}}
                    handleCreate={() => this.createOrupdateModalOpen({id:0})}
                    handleSearch = {(e: React.ChangeEvent<HTMLInputElement>) =>this.handleSearch(e)}
                    handleOnRow = {(item :EntityDto ) => this.createOrupdateModalOpen({ id:item.id} )}
                    handleExportFilePdf ={() =>{}}
                    handleExportExcel ={() => {}}

                    handleTableChangePagination={(pagination:any) => this.handleTableChange(pagination)}
                    DisableAdd= {this.props.provOrgStore.selectedValues === undefined ? true : false}
                    title="Transaction"
                />
                <CreateOrUpdateComponent
                    formRef={this.formRef}
                    visible={this.state.modalVisible}
                    footer ={undefined }
                    onCancel={() => this.setState({
                        modalVisible :false
                    })}
                    onCreate={this.handleCreate}
                    form={FormCustom}
                    width={1500}
                    className="modal-center"
                    TableModal={
                        <TableModal 
                            col={this.columnCustom()}
                            height={350}
                            dataSource={this.state.temporaryData}
                            display= {this.state.TableVisble}
                            handleOnRow={() =>{}}
                        />
                    }
                />
            </div>
        )
    }
}

export default MaterialTransaction



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


const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 20 },
  };

const tailFormItemLayout = {
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
  
  