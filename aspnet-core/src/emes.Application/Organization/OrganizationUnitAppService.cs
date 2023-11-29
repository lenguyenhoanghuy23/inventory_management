using Abp.Application.Services;

using System.Threading.Tasks;

namespace emes.Organization
{
    using Abp.Application.Services.Dto;
    using Abp.Authorization;
    using Abp.Domain.Entities;
    using Abp.Domain.Repositories;
    using Abp.Organizations;
    using Abp.Runtime.Session;
    using emes.Authorization;
    using emes.Authorization.Users;
    using emes.Organization.Dtos;
    using emes.Sessions.Dto;
    using Microsoft.EntityFrameworkCore;
    using System.Globalization;
    using System.Linq;
    using static Abp.Zero.Configuration.AbpZeroSettingNames;

    //[AbpAuthorize(PermissionNames.Pages_Organization)]
    public class OrganizationUnitAppService : AsyncCrudAppService<OrganizationUnit, OrgniationDto, long, PagedOrganizationResultRequestDto, OrgnizationUnitCreateDto, OrgniationDto>, IOrganizationUnitAppService
    {

        private readonly OrganizationUnitManager _OUManager;
        IAbpSession _abpSession;
        private readonly UserManager _userManager;
        public OrganizationUnitAppService(
            OrganizationUnitManager OUManager,
            IRepository<OrganizationUnit, long> repository,
            IAbpSession abpSession,
            UserManager userManager
            ) : base(repository)
        {

            _OUManager = OUManager;
            _abpSession = abpSession;
            _userManager = userManager;
        }
        TextInfo textInfo = new CultureInfo("en-US", false).TextInfo;
        public override async Task<OrgniationDto> CreateAsync(OrgnizationUnitCreateDto input)
        {
            CheckCreatePermission();
            try
            {
                var result = ObjectMapper.Map<OrganizationUnit>(input);
                result.DisplayName = textInfo.ToTitleCase(input.DisplayName);
                result.TenantId = AbpSession.TenantId;
                result.ParentId = input?.ParentId != 0 ? input.ParentId : null;
                await _OUManager.CreateAsync(result);
                return MapToEntityDto(result);
            }
            catch (System.Exception)
            {
                throw;
            }
        }

        public override async Task<OrgniationDto> UpdateAsync(OrgniationDto input)
        {
            CheckUpdatePermission();
            var result = Repository.GetAllListAsync(x => x.Id == input.Id).Result.FirstOrDefault();
            //result.ParentId = input?.ParentId != 0 ? input.ParentId : null;
            result.DisplayName = textInfo.ToTitleCase(input.DisplayName);
            await _OUManager.UpdateAsync(result);
            return base.MapToEntityDto(result);
        }
        public override Task DeleteAsync(EntityDto<long> input)
        {
            CheckDeletePermission();
            _OUManager.Delete(input.Id);
            return base.DeleteAsync(input);
        }
        protected override void MapToEntity(OrgniationDto updateInput, OrganizationUnit entity)
        {
            base.MapToEntity(updateInput, entity);
        }
      
        public override async Task<PagedResultDto<OrgniationDto>> GetAllAsync(PagedOrganizationResultRequestDto input)
        {
            var child = await _OUManager.FindChildrenAsync(null, true);
            var dto = child.Where(x => x.ParentId == null).Select(x => base.MapToEntityDto(x)).ToList();
            PagedResultDto<OrgniationDto> result = new PagedResultDto<OrgniationDto>(dto.Count, dto);
            return result;
        }
        protected override IQueryable<OrganizationUnit> CreateFilteredQuery(PagedOrganizationResultRequestDto input)
        {
            if (AbpSession.UserId == 1)
            {
                return Repository.GetAll();
            }
            return base.CreateFilteredQuery(input);
        }
    }
}
