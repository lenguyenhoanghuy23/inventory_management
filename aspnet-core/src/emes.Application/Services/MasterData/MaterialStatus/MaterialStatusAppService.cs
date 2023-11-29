

namespace emes.Services.MasterData.MaterialStatus
{
    using Abp.Domain.Repositories;
    using emes.Models.Material;
    using emes.Services.MasterData.MaterialStatus.Dto;
    using System.Globalization;
    using System.Threading.Tasks;

    public class MaterialStatusAppService : AsyncCrudAppService<MaterialStatusModel, MaterialStatusDto, Guid, PageMaterialStatusResultRequestDto, MaterialStatusCreateDto, MaterialStatusDto>, IMaterialStatusAppService
    {
        private readonly IRepository<MaterialStatusModel, Guid> _repository;
        public MaterialStatusAppService
            (
                IRepository<MaterialStatusModel, Guid> repository
            ) : base(repository)
        {
            _repository = repository;
        }

        TextInfo textInfo = new CultureInfo("en-US", false).TextInfo;
        public override async Task<MaterialStatusDto> CreateAsync(MaterialStatusCreateDto input)
        {
            var result = ObjectMapper.Map<MaterialStatusModel>(input);
            result.MaterialStatus = input.MaterialStatus;
            result.TenantId = AbpSession.TenantId.Value;
            result.Description = textInfo.ToTitleCase(input.Description);
            await _repository.InsertAsync(result);
            return  base.MapToEntityDto(result);

        }


        protected override MaterialStatusModel MapToEntity(MaterialStatusCreateDto createInput)
        {
            return base.MapToEntity(createInput);
        }
    }
}
