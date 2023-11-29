using Abp.Application.Services;
using emes.MultiTenancy.Dto;

namespace emes.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

