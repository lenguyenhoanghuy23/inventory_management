


namespace emes.Services.MasterData.MaterialType
{
    
   

    public class MaterialTypeAppService : AsyncCrudAppService<MaterialTypeModel, MaterialTypeDto, Guid, PageMaterialTypeResultRequestDto, MaterialTypeCreateDto, MaterialTypeDto>, IMaterialTypeAppService
    {
        private readonly IRepository<MaterialTypeModel, Guid> _repository;
        public MaterialTypeAppService(
            IRepository<MaterialTypeModel, Guid> repository
            ) : base(repository)
        {
            _repository = repository;
        }
        TextInfo textInfo = new CultureInfo("en-US", false).TextInfo;
        public override async Task<MaterialTypeDto> CreateAsync(MaterialTypeCreateDto input)
        {
            CheckCreatePermission();
            var exited = await _repository.FirstOrDefaultAsync(x => x.MaterialTypes == input.materialTypes);
            if (exited == null)
            {
                var result = ObjectMapper.Map<MaterialTypeModel>(input);
                result.MaterialTypes = input.materialTypes.ToUpper();
                result.Description = textInfo.ToTitleCase(input.Description);
                result.TenantId = input.TenantId;
                await _repository.InsertAsync(result);
                return base.MapToEntityDto(result);
            }
            throw new EntityNotFoundException($"{input.materialTypes}  tồn tại");


        }

        public override async Task<MaterialTypeDto> UpdateAsync(MaterialTypeDto input)
        {
            CheckUpdatePermission();
            var exited = await _repository.FirstOrDefaultAsync(x => x.Id == input.Id);
            if (exited != null)
            {
                var result = await _repository.FirstOrDefaultAsync(x => x.Id == input.Id);
                result.MaterialTypes = input.MaterialTypes.ToUpper();
                result.Description = textInfo.ToTitleCase(input.Description);
                await Repository.UpdateAsync(result);
                MapToEntity(input, result);
            
            }
            return await base.GetAsync(input);
        }

        protected override MaterialTypeDto MapToEntityDto(MaterialTypeModel entity)
        {
            return base.MapToEntityDto(entity);
        }

        
        protected override void MapToEntity(MaterialTypeDto updateInput, MaterialTypeModel entity)
        {
            ObjectMapper.Map(updateInput, entity);
        }
    }
}
