import { Form, Input, Select } from "antd";
import { L } from "../../lib/abpUtility";
import React from "react";
import { FormInstance } from "antd/lib/form";
import "../../Style/Style.css"





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




export function FormT(items:any[] ,className: string, disable :boolean,formRef: React.RefObject<FormInstance>) {
  let form = null;
    form = (
        Object.keys(items[0]).map((key: any) => (
        
       
          <Form.Item name={key} {...layout} label={L(key)} key={key}>
              
              <Input  className={className}  disabled={disable} placeholder={L(key)}  />
          </Form.Item>
      
        ))
    );
    return <Form  ref={formRef}>  {form} </Form>
}


export function addNewFormItem(items:string ,className: string ,disable :boolean) {
   return ( 
      <Form.Item name={items} {...layout} label={L(items) }key={items} >
        <Input disabled ={disable} className={className}  placeholder={items}  />
      </Form.Item>
    );
}

export function addNewFormItemhaveaddonBefore(items: string, className: string, readOnly: boolean, addonBefore: string) {
  return (
    <Form.Item name={items} {...layout} label={L(items)} key={items}  rules={[{ required: true }]}>
      <Input readOnly={readOnly} 
              className={className} 
              placeholder={items} 
              addonBefore={addonBefore} 
      />
    </Form.Item>
  );
}

export function filterFormItems(formItems: React.ReactNode[], excludedIndexes: number[]): React.ReactNode[] {
  return formItems?.filter((item: React.ReactNode, index: number) => !excludedIndexes?.includes(index));
}

export function FormComponent(items:any[],className: string ,excludedIndexes: number[] ): React.ReactNode[] {
    let formItems = items.map((key) => (
      <Form.Item name={key} {...layout}  label={L(key)} key={key}>
        <Input   className={className} placeholder= {L(key)}/>
      </Form.Item>
    ));
    return  formItems?.filter((item: React.ReactNode, index: number) => !excludedIndexes.includes(index) )
    
}
export function ComponentFormItem(items:any , className:string) {
  let form = null;
  form = (
    items.map((x:any) =>  (
        <Form.Item label={L(x)}  {...layout}  name={x} key={x} >
            <Input      
            
                allowClear
                className={className} 
                placeholder= {L(x)}
            />
        </Form.Item>
      ))
  );
  return  form
}
export function ComponentFormSelect( items:string,option :any , className :string) {
  return (
    <Form.Item label={L(items)}  {...tailFormItemLayout} key={items}   name={items} >
        <Select 
          className={ className}
          style={{ width: 300}}
          options={option}
          allowClear
          optionLabelProp="label"
          placeholder ={L (`Please select` + items )}
        />
    </Form.Item>
  )
}