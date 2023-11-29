// import {  DownloadOutlined, PlusOutlined, UploadOutlined} from '@ant-design/icons';
import { Button, Col, Form, Row , Table , Input, Dropdown, Menu } from 'antd'
import  React from 'react'
import { L } from '../../lib/abpUtility';
import AppComponentBase from '../AppComponentBase';
import UploadFileExcel from './Upload';
import "../../Style/Style.css"
import { DownloadOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';



interface Iprops {
    columns : any
    datarow : any,
    title:string,
    handleCreate:()=> void
    handleExportExcel: () => void
    handleExportFilePdf:() => any
    handleImport :() => void
    handleSearch:(e: React.ChangeEvent<HTMLInputElement>) => void
    handleOnRow: (record:any) => void
    handleTableChangePagination :(pagination:any) => any
    DisableAdd : boolean
}

class TableComponent extends AppComponentBase<Iprops >{
    state = {
        modalVisible: false,
    };

    onHandleClick =() =>{
        this.props.handleCreate()
    }

    onhandleExporExcel = () =>{
        this.props.handleExportExcel()
    }

    handleExportPdf =() =>{
        this.props.handleExportFilePdf()
    }

    handleImport =() =>{
        this.props.handleImport()
    }
    handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        this.props.handleSearch(e)

    }
    YourComponent = () => {
        const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
            console.log(e);
        };
        return handleImport
    }
    Modal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible,
        });
    };
    handleOnRow = (record:any)=>{
        this.props.handleOnRow(record.record )
    }
    handleTableChange(pagination:any){
        this.props.handleTableChangePagination(pagination)
    }
    render() {


        const {columns,datarow  ,title ,DisableAdd } = this.props
      
        
        const menu = (
            <Menu >
                <Menu.Item style={{fontSize:"16px"}} onClick={()=> this.onHandleClick()}>{L('add new fiel')} {<PlusOutlined />}</Menu.Item>
                <Menu.Item style={{fontSize:"16px"}} onClick={() => this.handleImport() }>{L('import to Excel')} {<DownloadOutlined />}</Menu.Item>
                <Menu.Item style={{fontSize:"16px"}} onClick={() => {} }>{L('export file excel')} {<UploadOutlined />}</Menu.Item>
                <Menu.Item  style={{fontSize:"16px"}} onClick={() => {} }>{L('export file pdf')} {<UploadOutlined />}</Menu.Item>
            </Menu>
        );

        

        
        return(
            <div>
                <Row>
                    <Col
                        xs={{ span: 4, offset: 0 }}
                        sm={{ span: 4, offset: 0 }}
                        md={{ span: 4, offset: 0 }}
                        lg={{ span: 2, offset: 0 }}
                        xl={{ span: 2, offset: 0 }}
                        xxl={{ span: 5, offset:0 }}
                      
                    >
                        <h2>{L(title)}</h2>
                    </Col>
                    <Col
                        xs={{ span: 14, offset: 0 }}
                        sm={{ span: 15, offset: 0 }}
                        md={{ span: 15, offset: 0 }}
                        lg={{ span: 1, offset: 21 }}
                        xl={{ span: 1, offset: 21 }}
                        xxl={{ span: 1, offset: 18 }}
                    >
                        <Dropdown
                            disabled = {DisableAdd}
                            trigger={["click"]}
                            overlay={menu}
                            placement="bottomRight"
                        >
                            <Button className='border-Form'>New</Button>
                        </Dropdown>
                    </Col>
                </Row>
                <Row justify="space-between">
                    <Col span={4} >
                        <Input  allowClear
                                placeholder={this.L('Filter')}
                                className='sizeInput-border'
                                onChange={this.handleSearch}
                            />
                    </Col>
                  
                </Row>
                <Row style={{ marginTop: 20 }}>
                    <Col
                    xs={{ span: 24, offset: 0 }}
                    sm={{ span: 24, offset: 0 }}
                    md={{ span: 24, offset: 0 }}
                    lg={{ span: 24, offset: 0 }}
                    xl={{ span: 24, offset: 0 }}
                    xxl={{ span: 24, offset: 0 }}
                    >
                    <Form >
                        <Table
                            rowKey={(record) => record?.id?.toString()}
                            bordered={true}
                            columns={columns}
                            pagination={{ pageSize: 10, total: datarow === undefined ? 0 : datarow.totalCount, defaultCurrent: 1 }}
                            loading={datarow === undefined ? true : false}
                            dataSource={datarow === undefined ? [] : datarow?.items }
                            onChange={(pagination) => this.handleTableChange(pagination)}
                            onRow={(record, rowIndex) => {
                                return {
                                    onDoubleClick: (e) => {
                                        this.handleOnRow({ record });
                                    },
                                   // className: record.isCompleted ? 'completed-row' : '', // Tùy chỉnh class CSS cho hàng dựa trên thuộc tính isCompleted

                                };
                            }}
                        />
                    </Form>
                        <UploadFileExcel
                            visible ={this.state.modalVisible}
                            onCancel={() => this.setState({
                                modalVisible :false
                            })}
                            onCreate={this.handleImport}
                        />
                    </Col>
                </Row>
            </div>

        );
    }
}
export default  TableComponent

