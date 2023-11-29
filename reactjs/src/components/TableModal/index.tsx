import React from "react";
import AppComponentBase from "../AppComponentBase";
import {  Table } from "antd";





export interface IProps{
    col :any | undefined
    dataSource :any
    display : string
    height :number 
    handleOnRow: any
}



class TableModal extends AppComponentBase<IProps> {

    handleOnRow = (record:any)=>{
        this.props.handleOnRow(record)
        
    }

    render() {
        const {col ,dataSource , display,height ,} = this.props
        console.log(dataSource);
        
        return(
            <div>
                <Table 
                    rowKey={(record) => record.id.toString()}
                    columns={col}
                    pagination={{ pageSize: 5, total: dataSource === undefined ? 0 : dataSource.totalCount, defaultCurrent: 1 }}
                    loading={dataSource === undefined ? true : false}
                    dataSource={dataSource === undefined ? [] : dataSource.items ?? dataSource}
                    scroll={{ y: 200 }}
                    style={{ height: height , display:display}}
                    onRow={(record , rowIndex) =>{
                        return {
                            onDoubleClick: e => {
                                this.handleOnRow(record)
                            }
                        }
                    }}
                />
            </div>

            
        )
    }
}

export default TableModal