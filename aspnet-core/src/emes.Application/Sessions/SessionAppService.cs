
using Abp.Auditing;
using emes.Sessions.Dto;

namespace emes.Sessions
{
    public class SessionAppService : emesAppServiceBase, ISessionAppService
    {
        [DisableAuditing]
        public async Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations()
        {
            var output = new GetCurrentLoginInformationsOutput
            {
                Application = new ApplicationInfoDto
                {
                    Version = AppVersionHelper.Version,
                    ReleaseDate = AppVersionHelper.ReleaseDate,
                    Features = new Dictionary<string, bool>()
                }
            };

            if (AbpSession.TenantId.HasValue)
            {
                output.Tenant = ObjectMapper.Map<TenantLoginInfoDto>(await GetCurrentTenantAsync());
            }
            if (AbpSession.UserId.HasValue)
            {
                output.User = ObjectMapper.Map<UserLoginInfoDto>(await GetCurrentUserAsync());
            }
            if (AbpSession.TenantId.HasValue && AbpSession.UserId.HasValue)
            {
                output.organization = ObjectMapper.Map<OrganizationDto>(await GetOrganization());
            }
            return output;
        }

        public async Task<List<GetUserOrganizationCurrentOutput>> GetUserOrganizationCurrent()
        {
            var outputList = new List<GetUserOrganizationCurrentOutput>();

            if (AbpSession.TenantId.HasValue && AbpSession.UserId.HasValue)
            {
                var rs = await GetUserOrganizations();
               
                foreach (var org in rs)
                {
                    var output = new GetUserOrganizationCurrentOutput();
                    output.organization = ObjectMapper.Map<OrganizationDto>(org);
                    outputList.Add(output);
                }

            }

            return outputList;
        }
    }
}
