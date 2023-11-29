using Abp.Application.Services;
using emes.Organization.Dtos;

namespace emes.Organization
{
    public interface IOrganizationUnitAppService :IAsyncCrudAppService<OrgniationDto , long,  PagedOrganizationResultRequestDto,OrgnizationUnitCreateDto ,OrgniationDto>
    {
    }
}
