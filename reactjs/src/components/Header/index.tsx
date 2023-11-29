import './index.less';

import * as React from 'react';

import { Avatar, Badge, Col, Dropdown, Menu, Row, Select, Tag, Typography } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined } from '@ant-design/icons';

import { L } from '../../lib/abpUtility';
import LanguageSelect from '../LanguageSelect';
import { Link } from 'react-router-dom';
import profilePicture from '../../images/user.png';
import { inject, observer } from 'mobx-react';
import Stores from '../../stores/storeIdentifier';
import AppComponentBase from '../AppComponentBase';
import SessionStore from '../../stores/sessionStore';
import provOrgStore from '../../stores/provOrgStore';

export interface IHeaderProps {
  collapsed?: any;
  toggle?: any;
  sessionStore?: SessionStore,
  provOrgStore?: provOrgStore,
  onSelectChange: (e:number[]) => void
}

const userDropdownMenu = (
  <Menu>
    <Menu.Item key="2">
      <Link to="/logout">
        <LogoutOutlined />
        <span> {L('Logout')}</span>
      </Link>
    </Menu.Item>
  </Menu>
);

@inject(Stores.SessionStore, Stores.ProvOrgStore )
@observer

export class Header extends AppComponentBase<IHeaderProps> {

  state ={
    valueSelect:[],
    label:"",
   
  }; 

  handleChange = (event: number  , option :any) => {
    this.setState({ label: option?.label });
    return (
      this.props.provOrgStore?.setSelectedLabel(option?.label), 
      this.props.provOrgStore?.setSelectedValues(event))
  };
  
  render() {
    //console.log(this.getUserWithOrganization());
    const userInfo = this.props?.sessionStore?.currentLogin
    const OrgInfo = this.props.sessionStore?.organization
    const OUInf = OrgInfo?.map((x:any) => { // get value OU display on select
      return { label: x.organization.displayName, value: x.organization.id };
    })

    this.props.provOrgStore?.setSelectedNameUser(userInfo?.user?.name)

    return (
      <Row className={'header'}>
        <Col style={{ textAlign: 'left' }} span={1}>
          {this.props.collapsed ? (
            <MenuUnfoldOutlined className="trigger" onClick={this.props.toggle} />
          ) : (
            <MenuFoldOutlined className="trigger" onClick={this.props.toggle} />
          )}
        </Col>
        <Col style={{ textAlign: 'left' , }} span={5}> 
          <Select
              style={{
                width: '300px',
              }}
              allowClear
              placeholder="Please select an organization to view"
              className='border-Form'
              children
              options={OUInf}
              onChange={this.handleChange }
          />
        </Col>
        <Col style={{ padding: '0px 15px 0px 15px', textAlign: 'right', }}  span={18}>
          <LanguageSelect /> {'   '}
          <Dropdown overlay={userDropdownMenu} trigger={['click']}>
            <Badge style={{}} count={3}>
              <Typography.Text type="secondary">{L("Hi ")} 
                    <Tag color="magenta"> 
                        {userInfo?.user?.name}@
                        {userInfo?.tenant?.name ??"N/A"}@
                        {this.state.label ??"N/A"}
                    </Tag> 
              </Typography.Text>
              <Avatar style={{ height: 24, width: 24 }} shape="circle" alt={'profile'} src={profilePicture} />
            </Badge>
          </Dropdown>
        </Col>
      </Row>  
    );
  }
}

export default Header;
