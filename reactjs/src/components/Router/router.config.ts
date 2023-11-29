
import LoadableComponent from './../Loadable/index';
import { HomeOutlined, UserOutlined, TagsOutlined, AppstoreOutlined, InfoCircleOutlined } from '@ant-design/icons';

export const userRouter: any = [
  {
    path: '/user',
    name: 'user',
    title: 'User',
    component: LoadableComponent(() => import('../../components/Layout/UserLayout')),
    isLayout: true,
    showInMenu: false,
  },
  {
    path: '/user/login',
    name: 'login',
    title: 'LogIn',
    component: LoadableComponent(() => import('../../scenes/Login')),
    showInMenu: false,
  },
];

export const appRouters: any = [
  {
    path: '/',
    exact: true,
    name: 'home',
    permission: '',
    title: 'Home',
    component: LoadableComponent(() => import('../../components/Layout/AppLayout')),
    isLayout: true,
    showInMenu: false,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    permission: '',
    title: 'Dashboard',
    icon: HomeOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/Dashboard')),
  },
  {
    path: '/users',
    permission: 'Pages.Users',
    title: 'Users',
    name: 'user',
    icon: UserOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/Users')),
  },
  {
    path: '/roles',
    permission: 'Pages.Roles',
    title: 'Roles',
    name: 'role',
    icon: TagsOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/Roles')),
  },
  {
    path: '/tenants',
    permission: 'Pages.Tenants',
    title: 'Tenants',
    name: 'tenant',
    icon: AppstoreOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/Tenants')),
  },
  {
    path: '/about',
    permission: '',
    title: 'About',
    name: 'about',
    icon: InfoCircleOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/About')),
  },
  {
    path: '/organization',
    permission: 'Pages.Organization',
    title: 'Organization',
    name: 'organization',
    icon: InfoCircleOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/OrganizationUnit/index')),
  },
  {
    path: '/plant',
    permission: '',
    title: 'Plant',
    name: 'plant',
    icon: InfoCircleOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/MaterialPlant/index')),
  },
  {
    permission: '',
    title: 'Inventory-stock',
    name: 'inventoryStock',
    icon: InfoCircleOutlined,
    showInMenu: true,
    children:[
      {
        path: '/Transaction',
        permission: '',
        title: 'Materail Transaction',
        name: 'materialTransaction',
        icon: AppstoreOutlined,
        showInMenu: true,
        component: LoadableComponent(() => import('../../scenes/MateialTransaction')),
      },
      {
        path: '/goodReceipts',
        permission: '',
        title: 'GoodReceipts',
        name: 'goodReceipts',
        icon: InfoCircleOutlined,
        showInMenu: true,
        component: LoadableComponent(() => import('../../scenes/GoodReceipts/Index')),
      },
      {
        path: '/goodIssues',
        permission: '',
        title: 'GoodIssues',
        name: 'goodIssues',
        icon: InfoCircleOutlined,
        showInMenu: true,
        component: LoadableComponent(() => import('../../scenes/GoodIssues/index')),
      },
      {
        path: '/Transaction/Setting',
        permission: '',
        title: 'Setting',
        name: 'transactionSetting',
        icon: AppstoreOutlined,
        showInMenu: true,
        component: LoadableComponent(() => import('../../scenes/SettingTransaction/index')),
      },
      {
        path: '/Transaction/Inventory',
        permission: '',
        title: 'Inventory',
        name: 'Inventory',
        icon: AppstoreOutlined,
        showInMenu: true,
        component: LoadableComponent(() => import('../../scenes/MaterialInventory/Inventory')),
      },
    ]
  },
  
  {
    permission: 'Pages.Material',
    title: "Material",
    name: 'material',
    icon: InfoCircleOutlined,
    showInMenu: true,
    children: [
      {
        path: '/material/MasterData',
        permission: 'Pages.MasterData',
        title: 'MasterData',
        name: 'materialMasterData',
        icon: AppstoreOutlined,
        showInMenu: true,
        component: LoadableComponent(() => import('../../scenes/MaterialMasterData')),
      },
      {
        path: '/material/MaterialItems',
        permission: 'Page.MaterialAssignment',
        title: 'Material Items',
        name: 'MaterialItems',
        icon: AppstoreOutlined,
        showInMenu: true,
        component: LoadableComponent(() => import('../../scenes/MaterialAssignment/index')),
      },
      {
        path: '/material/Setting',
        permission: '',
        title: 'Setting',
        name: 'materialSetting',
        icon: AppstoreOutlined,
        showInMenu: true,
        component: LoadableComponent(() => import('../../scenes/Setting/Material.Setting')),
      },
      
    ],
  },
  

  {
    path: '/logout',
    permission: '',
    title: 'Logout',
    name: 'logout',
    showInMenu: false,
    component: LoadableComponent(() => import('../../components/Logout')),
  },
  {
    path: '/exception?:type',
    permission: '',
    title: 'exception',
    name: 'exception',
    showInMenu: false,
    component: LoadableComponent(() => import('../../scenes/Exception')),
  },
];

export const routers = [...userRouter, ...appRouters];
