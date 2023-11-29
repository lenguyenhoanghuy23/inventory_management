

namespace emes.Services.MasterData.MaterialGroup
{
    public class MaterialGroupAppService : AsyncCrudAppService<MaterialGroupModel, MaterialGroupDto, Guid, PagedMaterialGroupResultRequestDto, MaterialGroupCreateDto, MaterialGroupDto>
    {
        private readonly IRepository<MaterialGroupModel, Guid> _repository;
        public MaterialGroupAppService(
            IRepository<MaterialGroupModel, Guid> repository
         ) : base(repository)
        {
            _repository = repository;
        }

        public override async Task<MaterialGroupDto> CreateAsync(MaterialGroupCreateDto input)
        {
          
            
            try
            {
                var result = ObjectMapper.Map<MaterialGroupModel>(input);

                result.TenantId = AbpSession.TenantId.Value;
                _repository.Insert(result);

                return base.MapToEntityDto(result);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
