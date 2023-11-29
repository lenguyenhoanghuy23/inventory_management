import RoleStore from './roleStore';
import TenantStore from './tenantStore';
import UserStore from './userStore';
import SessionStore from './sessionStore';
import AuthenticationStore from './authenticationStore';
import AccountStore from './accountStore';
import MTypeStore from './MTypeStore';
import MStatusStore from './MStatusStore';
import MaterialMasterDataStore from './MaterialMasterDataStore';
import MaterialTransactionTypeStore from './MaterialTransactionTypeStore';
import MaterialTransactionStore from './materialTransactionStore';
import materialGroupStore from './MaterialGroupStore';
import goodReceiptStore from './goodReceiptStore';
import goodIssuesStore from './goodIssuesStrore';
import organizationUnitStore from './organizationUnitStore';
import MaterialPlantStore from './MaterialPlantStore';
import provOrgStore from './provOrgStore';
import materialIventoryStore from './materialIventoryStore';
import materialAssignmentStore from './MaterialAssignmentStore';




export default function initializeStores() {
  return {
    authenticationStore: new AuthenticationStore(),
    roleStore: new RoleStore(),
    tenantStore: new TenantStore(),
    userStore: new UserStore(),
    sessionStore: new SessionStore(),
    accountStore: new AccountStore(),
    mTypeStore :new MTypeStore(),
    mStatusStore: new MStatusStore(),
    masterDataStore: new MaterialMasterDataStore(),
    materialTransactionTypeStore : new MaterialTransactionTypeStore(),
    materialTransactionStore : new MaterialTransactionStore(),
    materialGroupStore : new materialGroupStore(),
    goodReceiptStore : new goodReceiptStore(),
    goodIssuesStore : new goodIssuesStore(),
    organizationUnitStore : new organizationUnitStore(),
    materialPlantStore : new MaterialPlantStore(),
    provOrgStore : new provOrgStore(),
    materialIventoryStore : new materialIventoryStore(),
    materialAssignmentStore : new materialAssignmentStore(),
    
  };
}
