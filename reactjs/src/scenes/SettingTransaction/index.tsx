
import React from "react";
import AppComponentBase from "../../components/AppComponentBase";
import { Card } from "antd";
import MaterialTransactionType from "../MaterialTransactionType";
import MaterialTransactionTypeStore from "../../stores/MaterialTransactionTypeStore";
import { inject, observer } from "mobx-react";
import Stores from "../../stores/storeIdentifier";


export interface ITransactionTypeStoreProps{
    materialTransactionTypeStore:MaterialTransactionTypeStore

}

@inject(Stores.MaterialTransactionTypeStore )
@observer
class settingTransaction extends AppComponentBase <ITransactionTypeStoreProps>{

    state = {
        activeTabKey1: "tab1",
    };
    tabList  = [
        {
            key: 'tab1',
            tab: 'Type',
        },
    ];
    contentList: Record<string, React.ReactNode> = {
        tab1: <MaterialTransactionType materialTransactionTypeStore ={this.props.materialTransactionTypeStore} />,

    };


    onTab1Change = (key: string) => {
        this.setState({
            activeTabKey1: key
        })
    };
    


    render() {
        return(
            <Card
                title="Transaction"
                tabList={this.tabList}
                activeTabKey={this.state.activeTabKey1}
                onTabChange={this.onTab1Change}
            >
                {this.contentList[this.state.activeTabKey1]}
            </Card>

            
        )
    }
}

export default settingTransaction