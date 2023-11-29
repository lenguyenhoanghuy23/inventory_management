import { Form, Input, Modal, Tabs } from "antd";

import { FormInstance } from "antd/lib/form";
import React from "react";
import { L } from "../../../lib/abpUtility";
import AppComponentBase from "../../../components/AppComponentBase";

export interface ICreateOrUpdateProps {
    visible: boolean;
    onCancel: () => void;
    modalType: string;
    onCreate: () => void;
    formRef: React.RefObject<FormInstance>;
    
}

interface NumericInputState {
    value: string;
    style: React.CSSProperties;
    onChange: (value: string) => void;
}

const TabPane = Tabs.TabPane;

class CreateOrUpdate extends AppComponentBase<ICreateOrUpdateProps ,NumericInputState>{
    render() {        
        const {visible , onCancel , onCreate , formRef} = this.props
        return (
            <Modal visible ={visible}  cancelText ={L('Cancel')} okText={L('Ok')} onCancel={onCancel} onOk={onCreate}  destroyOnClose ={true}>
                <Form ref={formRef}>
                    <Tabs defaultActiveKey={"MaterialType"} size="small"  tabBarGutter={64}>
                        <TabPane tab ={'MaterialType'}>
                        <Form.Item label={L('materialStatus')} {...formItemLayout} name={'materialStatus'} >
                            <Input type="number"
                                    placeholder="nhập số "
                                    />
                        </Form.Item>
                        <Form.Item label={L('description')} {...formItemLayout} name={'description'} >
                            <Input.TextArea  
                                    style={{ height: 120, resize: 'none' }} 
                                    placeholder="nhập mô tả"
                                    maxLength={1024}
                                    />
                        </Form.Item>
                        </TabPane>
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
