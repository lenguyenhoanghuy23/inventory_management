import { ColumnType } from "antd/lib/table";
import { L } from "../../lib/abpUtility";
import React from "react";


export function Columns<T>(items:string[]) {
    const col: ColumnType<T>[]  = items.map((key: any) => ({
        title: L(key),
        dataIndex: key,
        key: key,
        render: (text: string) => <div>{text}</div> 
      }));
    return col
}
export function ColumnsT<T>(items:any[]) {
    let columns = Object.keys(items[0]).map((key: any) => ({
      title:L(key),
      dataIndex: key,
      key: key,
      render: (text: string) => <div>{text}</div>
    }));
    return columns;
}


export function filterColumnItems(formItems: ColumnType<any>[] , excludedIndexes: number[]): React.ReactNode[] {
  return formItems.filter((item: React.ReactNode, index: number) => !excludedIndexes.includes(index) ) ;
}

