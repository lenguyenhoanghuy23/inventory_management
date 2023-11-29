import './index.less';

import * as React from 'react';

import { Avatar, Col, Layout, Menu } from 'antd';
import { L, isGranted } from '../../lib/abpUtility';

import AbpLogo from '../../images/abp-logo-long.png';
import { appRouters } from '../../components/Router/router.config';
import utils from '../../utils/utils';

const { Sider } = Layout;

export interface ISiderMenuProps {
  path: any;
  collapsed: boolean;
  onCollapse: any;
  history: any;
}

const SiderMenu = (props: ISiderMenuProps) => {
  const { collapsed, history, onCollapse } = props;
  const currentRoute = utils.getRoute(history.location.pathname);
  return (
    <Sider trigger={null} className={'sidebar site-layout-background'} width={256} collapsible collapsed={collapsed} onCollapse={onCollapse} >
      {collapsed ? (
        <Col style={{ textAlign: 'center', marginTop: 15, marginBottom: 10 }}>
          <Avatar shape="square" style={{ height: 27, width: 64 }} src={AbpLogo} />
        </Col>
      ) : (
        <Col style={{ textAlign: 'center', marginTop: 15, marginBottom: 10 }}>
          <Avatar shape="square" style={{ height: 54, width: 128 }} src={AbpLogo} />
        </Col>
      )}

        <Menu theme="dark" mode="inline" defaultOpenKeys={[currentRoute?.path || '']} style={{height: '100%',borderRight: 0,}}>
        {appRouters
          .filter((item:any) => !item.isLayout && item.showInMenu && (!item.permission || isGranted(item.permission)))
          .map((route:any) =>
            route.children && route.children.length > 0 ? (
              <Menu.SubMenu key={route.children} title={L(route.title)} icon={<route.icon />}  onTitleClick={() => history.push(route.path)}>
                <Menu theme="dark" defaultOpenKeys={[currentRoute?.path || ""]}>
                  {route.children
                    .filter((subRoute:any) => !subRoute.permission || isGranted(subRoute.permission))
                    .map((subRoute:any) => (
                      <Menu.Item key={subRoute.path} onClick={() => history.push(subRoute.path)} icon={<subRoute.icon />} >
                        <span>{L(subRoute.title)}</span>
                      </Menu.Item>
                    ))}
                </Menu>
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={route.path} onClick={() => history.push(route.path)} icon={<route.icon />}>
                <span>{L(route.title)}</span>
              </Menu.Item>
            )
          )}
      </Menu>
    </Sider>
  );
};

export default SiderMenu;
