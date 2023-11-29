import Form, { FormInstance } from "antd/lib/form";
import AppComponentBase from "../../../components/AppComponentBase";
import { Input, Modal, Radio,Space,Tabs } from "antd";
import { L } from "../../../lib/abpUtility";
import React from "react";
import { GetStatus, GetType } from "../../../services/MaterialMasterData/Dto/MasterDataDto";



export interface ICreateOrUpdateProps {
    visible: boolean;
    onCancel: () => void;
    modalType: string;
    onCreate: () => void;
    formRef: React.RefObject<FormInstance>;
    MType : GetType[]
    MStatus : GetStatus[]
}

class CreateOrUpdate extends AppComponentBase<ICreateOrUpdateProps> {
    render() {        
        const {visible , onCancel , onCreate , formRef  ,MStatus ,MType} = this.props
        return (
            <Modal visible ={visible}  cancelText ={L('Cancel')} okText={L('Ok')} onCancel={onCancel} onOk={onCreate} width={650} destroyOnClose ={true}>
                <Form ref={formRef}>
                    <Tabs defaultActiveKey={"MasterData"} size="small"  tabBarGutter={64}>
                        <Tabs.TabPane tab ={'Master Data'} key={"MasterData"} >
                            <Form.Item label={L('materialNumber')} {...formItemLayout} name={'materialNumber'}  >
                                <Input      
                                            placeholder="nhập materialNumber"
                                />
                            </Form.Item>
                            <Form.Item label={L('description')} {...formItemLayout} name={'description'} >
                                <Input.TextArea  
                                        style={{ height: 120, resize: 'none' }} 
                                        placeholder="nhập mô tả"
                                        maxLength={1024}
                                        />
                            </Form.Item>
                            <Form.Item label={L('material Group')} {...formItemLayout} name={'materialGroup'} >
                                <Input  
                                        
                                        placeholder="nhập material Group"
                                        maxLength={1024}
                                        />
                            </Form.Item>
                            <Form.Item label={L('primary Uom')} {...formItemLayout} name={'primaryUom'} >
                                <Input  
                                        
                                        placeholder="nhập primary Uom"
                                        maxLength={1024}
                                        />
                            </Form.Item>
                            <Form.Item label={L('secondary Uom')} {...formItemLayout} name={'secondaryUom'} >
                                <Input  
                                        
                                        placeholder="nhập secondary Uom"
                                        maxLength={1024}
                                        />
                            </Form.Item>
                        </ Tabs.TabPane> 
                        <Tabs.TabPane tab={"Material Type"} key={"materialType"}> 
                            <Form.Item {...tailFormItemLayout} name={'materialType'}>
                                <Radio.Group>
                                    <Space direction="vertical">
                                        {MType.map((x:GetType) => (
                                            <Radio key={x.id} value={x.id}>
                                                { x.materialTypes} - {x.description}
                                            </Radio>
                                        ))}
                                    </Space>
                                </Radio.Group>
                            </Form.Item>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab={"Material Status"} key={"materialStatus"}>
                            <Form.Item {...tailFormItemLayout} name={'materialStatus'}>
                                <Radio.Group >
                                    <Space direction="vertical">
                                        {MStatus.map((x:GetStatus) => (
                                            <Radio key={x.id} value={x.id}>
                                                {x.materialStatus} - {x.description}
                                            </Radio>
                                        ))}
                                    </Space>
                                </Radio.Group>
                            </Form.Item>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab={"Material Group"} key={"materialGroup"}>
                            <Form.Item {...tailFormItemLayout} name={'materialGroup'}>
                                <Radio.Group >
                                    <Space direction="vertical">
                                        {MStatus.map((x:GetStatus) => (
                                            <Radio key={x.id} value={x.id}>
                                                {x.materialStatus} - {x.description}
                                            </Radio>
                                        ))}
                                    </Space>
                                </Radio.Group>
                            </Form.Item>
                        </Tabs.TabPane>
                    </Tabs>
                </Form>
            </Modal>
        )
    }
}

export default CreateOrUpdate

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