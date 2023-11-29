

using Abp.UI;
using System.Text;
using static System.Formats.Asn1.AsnWriter;

namespace emes.Services.MasterData.MaterialPlant
{
    public class MaterialPlantAppService : EmesCrudAppService<MaterialPlantModel, MaterialPlantDto, Guid, PagedMaterialPlantResultRequestDto, MaterialPlantCreateDto, MaterialPlantDto>, IMaterialPlantAppService
    {

        private readonly UserManager _userManager;
        public MaterialPlantAppService(
            IRepository<MaterialPlantModel, Guid> repository,
            UserManager userManager
        ) : base(repository)
        {

            _userManager = userManager;
        }
        protected virtual async Task<OrganizationUnit> OrganizationId()
        {
            var user = await _userManager.FindByIdAsync(AbpSession.GetUserId().ToString());
            var organizationId = _userManager.GetOrganizationUnitsAsync(user)?.Result?.FirstOrDefault() ?? throw new EntityNotFoundException();
            return organizationId;
        }

        public override async Task<MaterialPlantDto> CreateAsync(MaterialPlantCreateDto input)
        {


            checkExitedName(input);
            var result = MapToEntity(input);
            result.PlantCode = GenerateRandomCode(10, 25);
            result.PlantName = input.PlantName;
            result.description = input.description;
            result.OrganizationUnitId = OrganizationId().Result.Id;
            await Repository.InsertAsync(result);
            await CurrentUnitOfWork.SaveChangesAsync();
            return base.MapToEntityDto(result);
        }



        public override async Task DeleteAsync(EntityDto<Guid> input)
        {
            var result = await Repository.FirstOrDefaultAsync(x => x.Id == input.Id);

            await Repository.DeleteAsync(result);

        }




        protected override IQueryable<MaterialPlantModel> CreateFilteredQuery(PagedMaterialPlantResultRequestDto input)
        {
            var orgId = OrganizationId().Result.Id;
            var query = Repository.GetAll().Where(x => x.OrganizationUnitId == orgId);
            if (!input.Keyword.IsNullOrWhiteSpace())
            {
                query = query.Where(x => x.PlantName.Contains(input.Keyword.Trim()));
            }
            return query;
        }

        protected override MaterialPlantDto MapToEntityDto(MaterialPlantModel entity)
        {
            return base.MapToEntityDto(entity);
        }

        private void checkExitedName(MaterialPlantCreateDto entity)
        {
            var exited = Repository.FirstOrDefault(x => x.PlantName == entity.PlantName);
            if (exited != null) throw new UserFriendlyException(L($"NameIsExisted", entity.PlantName));

        }

        protected string GenerateRandomCode(int minLenght, int maxLenght)
        {
            var random = new Random();
            int length = random.Next(minLenght, maxLenght);
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            StringBuilder sb = new StringBuilder(length);
            for (int i = 0; i < length; i++)
            {
                sb.Append(chars[random.Next(chars.Length)]);
            }

            return sb.ToString();
        }
    }
}
