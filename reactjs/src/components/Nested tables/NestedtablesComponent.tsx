import React from "react";
import AppComponentBase from "../AppComponentBase";
import {   Button, Col,  Form, Input, Row,  Table } from "antd";
import {  PlusOutlined,  } from "@ant-design/icons";
import "../../Style/Style.css"
export interface NestedtablesPropsComponent {
    columnsParent:any
    columnschildren:any| undefined
    Columnsheader :any
    dataSource :any,
    dataSourceparent :(id:number) =>any | undefined
    onClick: () => void
    handleOnRow:any
    handleSearch(e:React.ChangeEvent<HTMLInputElement>):any
    dataSourcechildren :(id:number) =>any | undefined
    showheader:string 
}
class NestedtablesComponent extends AppComponentBase<NestedtablesPropsComponent> {
    onHandleClick =() =>{
        this.props.onClick()
        return
    }
    handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        //console.log(e.target?.value);
        
        this.props.handleSearch(e)
    }
    handleOnRow = (record:any)=>{        
        //console.log(record.record.id);
        this.props.handleOnRow(record.record , record.des)
    }
    render() {
        const {dataSource ,columnsParent, dataSourceparent,Columnsheader , showheader}  = this.props 
    
        const expandedRowRenderParent =(parentItem :any) => {
            const ParentItem =this.props.dataSourceparent(parentItem.id) 
                return <Table
                rowKey={(record) => record.id.toString()}
                bordered={true}
                columns={columnsParent}
                pagination={ false}
                loading={dataSourceparent === undefined ? true : false}
                dataSource={ParentItem === undefined ? [] : ParentItem.items }
                onRow={(record, rowIndex) => {
                    return {
                    onDoubleClick: (e) => {
                        this.handleOnRow({ record, des: "parent" });
                    },
                    };
                }}
                />
           
        } 
        return (
            <div>
            
                <Row>
                    <Col
                    xs={{ span: 4, offset: 0 }}
                    sm={{ span: 4, offset: 0 }}
                    md={{ span: 4, offset: 0 }}
                    lg={{ span: 2, offset: 0 }}
                    xl={{ span: 2, offset: 0 }}
                    xxl={{ span: 2, offset: 0 }}
                    >
                    {' '}
                    </Col>
                    <Col
                    xs={{ span: 14, offset: 0 }}
                    sm={{ span: 15, offset: 0 }}
                    md={{ span: 15, offset: 0 }}
                    lg={{ span: 1, offset: 21 }}
                    xl={{ span: 1, offset: 21 }}
                    xxl={{ span: 1, offset: 21 }}
                    >
                        <Button type="primary" shape="circle" icon={<PlusOutlined />} hidden  onClick={()=> this.onHandleClick()}/>
                    </Col>
                </Row>
            
                <Row justify="space-between">
                    <Col span={8}>
                        <Input  allowClear
                                className="sizeInput-border"
                                placeholder={this.L('Filter')}  
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
                         
                                rowKey={(record) => record.id.toString()}
                                columns={Columnsheader}
                                title={() => showheader}
                                expandable={{ expandedRowRender: expandedRowRenderParent, defaultExpandedRowKeys: ['0'] }} 
                                dataSource={dataSource === undefined ? [] : dataSource.items }
                            />
                        </Form>
                    </Col>
                </Row>
            </div>  
        );
    }
}
 
export default NestedtablesComponent;


