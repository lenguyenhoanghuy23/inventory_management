

using Abp.Authorization;
using emes.Authorization;

namespace emes.Services.MasterData.MaterialAssignment
{
    [AbpAuthorize(PermissionNames.Pages_MaterialAssignment)]
    public class MaterialAssignmentAppService : AsyncCrudAppService<MaterialAssignmentModel, MaterialAssignmentDto, Guid, PagedMaterialAssignmentResultRequetDto, 
                                                                                                                        MaterialAssignmentCreateDto, MaterialAssignmentDto>, IMaterialAssignmentAppService
    {
        private readonly IRepository<MaterialAssignmentModel, Guid> _repository;
        private readonly IRepository<MaterialMasterDataModel, Guid> _masterDataModel;
        private readonly IRepository<OrganizationUnit, long> _ouRepository;
        private readonly UserManager _userManager;
        public MaterialAssignmentAppService(
                IRepository<MaterialAssignmentModel, Guid> repository,
                UserManager userManager,
                IRepository<MaterialMasterDataModel, Guid> masterDataModel,
                IRepository<OrganizationUnit, long> ouRepository
            ) : base(repository)
        {
            _userManager = userManager;
            _masterDataModel = masterDataModel;
            _repository = repository;
            _ouRepository = ouRepository;
        }
        public override async Task<MaterialAssignmentDto> CreateAsync(MaterialAssignmentCreateDto input)
        {
            try
            {
                var materialmaterdata = await _masterDataModel.GetAll().Where(x => x.MaterialNumber == input.MaterialNumber).FirstOrDefaultAsync();
                var Exited =  await Repository.GetAll().Where(x=>x.MaterialMasterData.MaterialNumber == input.MaterialNumber && x.OrganizationUnitId == input.OrganizationUnitId).FirstOrDefaultAsync();
                if (Exited == null)
                {
                    var assign = ObjectMapper.Map<MaterialAssignmentModel>(input);
                    assign.MaterialMasterData = materialmaterdata;
                    assign.TenantId = AbpSession.TenantId.Value;
                    assign.OrganizationUnitId = input.OrganizationUnitId;
                    await _repository.InsertAsync(assign);
                    return base.MapToEntityDto(assign);
                }
                throw new EntityNotFoundException($"{input.MaterialNumber} already exists");    
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<MaterialAssignmentDto> CreateAsyncForAdmin(MaterialAssignmentCreateDto input )
        {

            try
            {
                var ouId = await _ouRepository.GetAll().Where(x => x.DisplayName == "Admin" && x.TenantId == AbpSession.TenantId.Value).FirstOrDefaultAsync();
                var materialmaterdata = await _masterDataModel.GetAll().Where(x => x.MaterialNumber == input.MaterialNumber).FirstOrDefaultAsync();
                var assign = ObjectMapper.Map<MaterialAssignmentModel>(input);
                assign.MaterialMasterData = materialmaterdata;
                assign.TenantId = AbpSession.TenantId.Value;
                assign.OrganizationUnitId = ouId.Id;
                await _repository.InsertAsync(assign);
                return base.MapToEntityDto(assign);
            }
            catch (Exception)
            {

                throw;
            }
            throw new NotImplementedException();
        }

        protected override IQueryable<MaterialAssignmentModel> CreateFilteredQuery(PagedMaterialAssignmentResultRequetDto input)
        {
            var query = Repository.GetAll().Where(x => x.OrganizationUnitId == input.OrganizationUnitId);
            return query;
        }

        protected override MaterialAssignmentDto MapToEntityDto(MaterialAssignmentModel entity)
        {
            var materialmaterdata = _masterDataModel.GetAll()
                .Include(x => x.materialStatus)
                .Include(x => x.MaterialType)
                .Where(x => x.Id == entity.MaterialMasterDataId).FirstOrDefault();
            var assignDto = base.MapToEntityDto(entity);
            assignDto.MaterialNumber = materialmaterdata?.MaterialNumber;
            assignDto.MaterialStatus = materialmaterdata?.materialStatus?.MaterialStatus ?? 0;
            assignDto.MaterialType = materialmaterdata?.MaterialType?.MaterialTypes;
            assignDto.Description = materialmaterdata?.Description;
            return assignDto;
        }
    }
}
