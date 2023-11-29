import { action, observable } from 'mobx';

import { GetCurrentLoginInformations } from '../services/session/dto/getCurrentLoginInformations';
import sessionService from '../services/session/sessionService';
import { organizationCurrent } from '../services/session/dto/organizationCurrent';


class SessionStore {
  @observable currentLogin: GetCurrentLoginInformations = new GetCurrentLoginInformations();

    @observable organization: organizationCurrent[] = [];
  @action
  async getCurrentLoginInformations() {
    let result = await sessionService.getCurrentLoginInformations();
    this.currentLogin = result;
  }

  @action
  async getUserWithOrganizationCurrent (){
      let result = await sessionService.getUserWithOrganizationCurrent();
      
      this.organization = result
  }
}

export default SessionStore;
