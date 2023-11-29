import { GetCurrentLoginInformations } from './dto/getCurrentLoginInformations';
import http from '../httpService';

declare var abp: any;

class SessionService {
  public async getCurrentLoginInformations(): Promise<GetCurrentLoginInformations> {
    let result = await http.get('api/services/app/Session/GetCurrentLoginInformations', {
      headers: {
        'Abp.TenantId': abp.multiTenancy.getTenantIdCookie(),
      },
    });
    console.log(result.data.result);
    
    return result.data.result;
  }

  public async getUserWithOrganizationCurrent (){
    let result = await http.get('api/services/app/Session/GetUserOrganizationCurrent');
    return result.data.result
  }
}

export default new SessionService();
