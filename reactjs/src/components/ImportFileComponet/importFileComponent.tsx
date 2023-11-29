import React from "react";
import AppComponentBase from "../AppComponentBase";
import {Card, Modal } from "antd";
import { L } from "../../lib/abpUtility";
import "./upload.css"



interface ImportFileComponentProps {
    visible: boolean;
    onCancel: () => void;
}
 
interface ImportFileComponentState {
    IsDragging:boolean,
    activeTabKey1:string,
}

 
class ImportFileComponent extends AppComponentBase <ImportFileComponentProps, ImportFileComponentState> {
   
    state = {
        activeTabKey1:"tab1",
        IsDragging:false,
    };

    tabList  = [
        {
            key: 'tab1',
            tab: L('Recent'),
        },
        {
            key: 'tab2',
            tab: L('Upload'),
        },
        
    ];

    
    contentList: Record<string, React.ReactNode> = {
        
        tab1:"" ,
        tab2:  
            <div className="image-upload-wrap parent  "  
            >
               <div className="drag-text">
                    <button>browse</button>
                    <h3>or Drag and drop a file</h3>
                </div>
            </div>
        ,
    };

    onTabChange = (key: string) => {
        this.setState({
            activeTabKey1: key
        })
    };
    render() { 
        const {visible , onCancel} = this.props
        return (
            <div>
                <Modal
                    onCancel={onCancel}
                    visible ={visible}
                    footer = {true}
                    width={1200}
                >
                   <Card
                   
                        tabList={this.tabList}
                        className="ant-card-body ant-modal-body ant-modal-footer size-form-upload"
                        bordered = {false}
                        activeTabKey={this.state.activeTabKey1}
                        onTabChange={this.onTabChange}
                        />
                            {this.contentList[this.state.activeTabKey1]}
                </Modal>
            </div>
        );
    }
}
 
export default ImportFileComponent;