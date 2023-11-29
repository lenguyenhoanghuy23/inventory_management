import {  Modal,  } from "antd";
import   { FormInstance } from "antd/lib/form";
import { L } from "../../lib/abpUtility";
import AppComponentBase from "../AppComponentBase";
import React from "react";
import './index.less';
import '../../scenes/MaterialMasterData/index.css'


export interface ICreateOrUpdateProps {
    visible: boolean;
    onCancel: () => void;
    onCreate: () => void ;
    formRef: React.RefObject<FormInstance> | null; 
    form: any | undefined
    width :number
    className?:string
    TableModal?: React.ReactNode; 
    footer : null | undefined // bằng Null nếu muốn ẩn footer , bằng undefined nếu muốn hiện
}


class CreateOrUpdateComponent extends AppComponentBase<ICreateOrUpdateProps> {
    render() {        
        const {visible , onCancel , onCreate , form  , width , className , TableModal  } = this.props 
        return (
                    <div >
                        <Modal  
                            visible ={visible}  
                           
                            cancelText ={L('Cancel')} 
                            okText={L('Ok')} 
                            onCancel={onCancel} 
                            onOk={onCreate}
                            className={className}
                            destroyOnClose ={true} 
                            width={width}>
                                {form}
                            {TableModal}                            
                        </Modal>
                    </div>
        )
    }
}

export default CreateOrUpdateComponent

