import React from "react";

import AppComponentBase from "../AppComponentBase";
import { Modal, } from "antd";
import { L } from "../../lib/abpUtility";

class UploadFileExcel extends AppComponentBase<any>{

    
    handleImport =(e: React.ChangeEvent<HTMLInputElement>) =>{
        this.props.onCreate(e)
    }
    
    
    
    render() {
        
        const {visible ,onCancel,onCreate } = this.props
        
        
        return (
            <Modal visible ={visible}  cancelText ={this.L('Cancel')} okText={L('Ok')} onCancel={onCancel} onOk= {onCancel}  destroyOnClose ={true} >
                <input type="file" name="file"  required 
                    onChange={onCreate}
                

                    accept=".xlsx, .xls , csv" />

            </Modal>
        )
    }
}

export default UploadFileExcel


