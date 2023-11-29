import React   from "react";

import AppComponentBase from "../../components/AppComponentBase";
import { Card } from "antd";

import { inject, observer } from "mobx-react";
import Stores from "../../stores/storeIdentifier";
import MaterialStatus from "../MeterialStatus";
import MStatusStore from "../../stores/MStatusStore";
import MType from "../MateialType/Index";
import MTypeStore from "../../stores/MTypeStore";
import MaterialGroup from "../MaterialGroup";
import materialGroupStore from "../../stores/MaterialGroupStore";


export interface IProps{
    mTypeStore:MTypeStore
    mStatusStore : MStatusStore
    materialGroupStore :materialGroupStore
}


@inject(Stores.MTypeStore , Stores.MStatusStore , Stores.MaterialGroupStore)
@observer
class MaterialSetting extends AppComponentBase<IProps> {
    state = {
        activeTabKey1:"tab1",
    };
    tabList  = [
        {
            key: 'tab1',
            tab: 'Type',
        },
        {
            key: 'tab2',
            tab: 'Status',
        },
        {
            key: 'tab3',
            tab: 'Group',
        },
    ];
    contentList: Record<string, React.ReactNode> = {
        tab1: <MType mTypeStore ={this.props.mTypeStore} />,
        tab2: <MaterialStatus mStatusStore ={this.props.mStatusStore}/>,
        tab3: <MaterialGroup materialGroupStore ={this.props.materialGroupStore}/>,
    };


    onTabChange = (key: string) => {
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
                    onTabChange={this.onTabChange}
                >
                    {this.contentList[this.state.activeTabKey1]}
                </Card>

        )
    }
}

export default MaterialSetting