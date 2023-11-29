import React from "react";
import AppComponentBase from "../AppComponentBase";
import { Table } from "antd";
import { EntityDto } from "../../services/dto/entityDto";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";

export interface NestedTableProps{
    columnsHeader:any
    dataSourceHeader:any
    columnsParent:any
    dataSourceParent :(id:any) =>any | undefined
    columnsChildren:any
    handleOnRow: (id:EntityDto , type :any) => void
} 


class NestesTableComponent extends AppComponentBase<NestedTableProps> {

    handleOnRow = (record:any)=>{        
        // console.log("nested",record.record.id);
        this.props.handleOnRow(record.record , record.des )
    }
    render() { 
        const { columnsHeader, dataSourceHeader ,columnsChildren,columnsParent,dataSourceParent} = this.props        
        const isRowExpandable = (record:any) => { 
            // isRowExpandable Kiểm tra xem có dữ liệu con hay không
            return record.children && record.children.length > 0;
        };
        const expandedRowChildren = (record :any ) => {  // expandedRowChildren dung de hien thi table children 
            console.log(">>",record.children.totalCount);
            return <Table 
                rowKey={(record:any) => record?.id?.toString()}
                columns={columnsChildren} 
                dataSource={record.children}  
                pagination={{ pageSize: 10, total: record.children.totalCount, defaultCurrent: 1 }}
                // pagination={ record?.children?.length > 1 ? { pageSize: 10, total:record?.children?.length, defaultCurrent: 1 } : false}
                bordered  
                onRow={(record , rowIndex) =>{
                    return {
                        onDoubleClick: e => {
                            this.handleOnRow({ record , des: "child"})
                        }
                    }
                }}       
            />;
        };

        const ExpandedRowParent =(parentItem :any) => { //ExpandedRowParent dung de hien thi table children 
            const ParentItem =this.props.dataSourceParent(parentItem.id) 
            return <Table
                rowKey={(record) => record.id.toString()}
                bordered={true}
                childrenColumnName="false" // set children khi muon hien children hoac false khi khong muon hien children 
                columns={columnsParent}
                pagination={ false}
                loading={dataSourceParent === undefined ? true : false}
                dataSource={ParentItem === undefined ? [] : ParentItem.items ?? ParentItem}
                expandable={{
                    // Sử dụng custom expandable function
                    rowExpandable: isRowExpandable,
                    expandedRowRender: expandedRowChildren,
                    defaultExpandAllRows: true,
                    expandIcon: ({ expanded, onExpand, record }) => // thay doi Icon khi expand row
                            expanded ? (
                            <CaretUpFilled onClick={(e:any) => onExpand(record, e)} />
                            ) : (
                            <CaretDownFilled onClick={(e:any) => onExpand(record, e)} />
                        )
                }}
                onRow={(record, rowIndex) => {
                    return {
                        onDoubleClick: () => {
                                this.handleOnRow({ record, des: "parent" });
                            },
                        };
                    }
                }
            />
        } 

        return ( 
            <div>
                <Table
                    rowKey={(record:any) => record?.id?.toString()}
                    columns={columnsHeader}
                    dataSource={dataSourceHeader === undefined ? [] : dataSourceHeader.items ?? dataSourceHeader }
                    childrenColumnName="false"
                    pagination={ dataSourceHeader?.totalCount >1 ?{ pageSize: 10, total: dataSourceHeader?.totalCount, defaultCurrent: 1 } : false}
                    expandable={{
                        expandedRowRender: ExpandedRowParent, defaultExpandedRowKeys: ['0'] ,
                        expandIcon: ({ expanded, onExpand, record }) =>
                            expanded ? (
                            <CaretUpFilled     onClick={(e:any) => onExpand(record, e)} />
                            ) : (
                            <CaretDownFilled    onClick={(e:any) => onExpand(record, e)} />
                        )
                    }} 
                />
            </div>
         );
    }
}
 
export default NestesTableComponent ;