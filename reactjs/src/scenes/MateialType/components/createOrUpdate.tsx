import { Input, Modal, Tabs } from "antd";
import Form, { FormInstance  } from "antd/lib/form";
import React from "react";
import { L } from "../../../lib/abpUtility";

export interface ICreateOrUpdateProps {
    visible: boolean;
    onCancel: () => void;
    modalType: string;
    onCreate: () => void;
    formRef: React.RefObject<FormInstance>;
}
const TabPane = Tabs.TabPane;
class CreateOrUpdate extends React.Component<ICreateOrUpdateProps>{

    onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log('Change:', e.target.value);
    };
    render() {
        const {visible , onCancel , onCreate , formRef} = this.props
        return (
            <Modal visible ={visible}  cancelText ={L('Cancel')} okText={L('Ok')} onCancel={onCancel} onOk={onCreate}  destroyOnClose ={true}>
                <Form ref={formRef}>
                    <Tabs defaultActiveKey={"materialTypes"} size="small"  tabBarGutter={64}>
                        <TabPane tab ={'MaterialType'}>
                        <Form.Item label={L('materialTypes')} {...formItemLayout} name={'materialTypes'} >
                            <Input />
                        </Form.Item>
                        <Form.Item label={L('description')} {...formItemLayout} name={'description'} >
                            <Input.TextArea  
                                    style={{ height: 120, resize: 'none' }} 
                                    maxLength={1024}
                                    //showCount ={true}
                                    onChange={this.onChange}
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
//     const tailFormItemLayout = {
//     labelCol: {
//         xs: { span: 6 },
//         sm: { span: 6 },
//         md: { span: 6 },
//         lg: { span: 6 },
//         xl: { span: 6 },
//         xxl: { span: 6 },
//     },
//     wrapperCol: {
//         xs: { span: 18 },
//         sm: { span: 18 },
//         md: { span: 18 },
//         lg: { span: 18 },
//         xl: { span: 18 },
//         xxl: { span: 18 },
//     },
// };