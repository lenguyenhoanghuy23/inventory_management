import ApplicationInfoDto from './applicationInfoDto';
import { OrganizationDto } from './organizationDto';

import TenantLoginInfoDto from './tenantLoginInfoDto';
import UserLoginInfoDto from './userLoginInfoDto';

export class GetCurrentLoginInformations {
  application!: ApplicationInfoDto;
  user!: UserLoginInfoDto;
  tenant!: TenantLoginInfoDto;
  organization!:OrganizationDto;
}
