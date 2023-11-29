

using Abp.UI;

namespace emes.Services.Transaction.MaterialTransactions
{
    public class MaterialTransactionAppService : EmesCrudAppService<MaterialTransactionsModel, TransactionDto, Guid, PagedTransactionResultRequestDto, TransactionCreateDto, TransactionUpdateDto>, IMaterialTransactionAppService
    {
        private readonly UserManager _userManager;

        private readonly IRepository<MaterialMasterDataModel, Guid> _masterDataModel;
        private readonly IRepository<GoodIssuesModel, Guid> _IssuesMode;
        private readonly IRepository<MaterialTransactionsTypesModel, Guid> _transactionTypeModel;
        private readonly IRepository<MaterialInventoryModel, Guid> _inventoryModel;

        public MaterialTransactionAppService(
           IRepository<MaterialTransactionsModel, Guid> repository,
            UserManager userManager,
             IRepository<MaterialMasterDataModel, Guid> masterDataModel,
             IRepository<GoodIssuesModel, Guid> IssuesMode,
             IRepository<MaterialTransactionsTypesModel, Guid> transactionTypeModel,
             IRepository<MaterialInventoryModel, Guid> inventoryModel
         ) : base(repository)
        {
            _userManager = userManager;
            _masterDataModel = masterDataModel;
            _IssuesMode = IssuesMode;
            _inventoryModel = inventoryModel;
            _transactionTypeModel = transactionTypeModel;
        }
        protected async Task<OrganizationUnit> GetOrganization()
        {
            var user = await _userManager.FindByIdAsync(AbpSession.GetUserId().ToString());
            var organizationId = _userManager.GetOrganizationUnitsAsync(user).Result?.FirstOrDefault() ?? throw new EntityNotFoundException();
            return organizationId;
        }
        public override Task<TransactionDto> CreateAsync(TransactionCreateDto input)
        {
            return base.CreateAsync(input);
        }
        public async Task<List<TransactionDto>> CreateListAsync(List<TransactionCreateDto> inputs)
        {
            Random rnd = new Random();
            var listTransaction = new List<TransactionDto>();
            foreach (var input in inputs)
            {
                var masterNumber = await _masterDataModel.GetAll()
                                    .Include(x => x.MaterialType)
                                    .Where(x => x.MaterialNumber == input.MaterialNumber)
                                    .FirstOrDefaultAsync();
                var DocumentExited = await Repository.GetAll().Where(x => x.DocmentType == input.DocmentType).FirstOrDefaultAsync();
                if (DocumentExited != null)
                {
                    throw new EntityNotFoundException($"DocumentType '{input.DocmentType}' already exists.");
                }
                var transType = await _transactionTypeModel.FirstOrDefaultAsync(x => x.TransactionType == input.TransactionType);
                var result = MapToEntity(input);
                result.TransactionNumber = rnd.Next().ToString();
                result.MaterialNumber = masterNumber;
                result.TransactionType = transType;
                result.TransationGroup = Guid.NewGuid();
                result.TransactionQuantiry = input.TransactionQuantiry;
                result.MaterialType = masterNumber.MaterialType.MaterialTypes;
                result.MaterialLot = input.MaterialLot;
                result.FromPlant = input.FromPlant;
                result.FromSubLocation = input.FromSubLocation;
                result.ToPlant = input.ToPlant;
                result.ToSubLocation = input.ToSubLocation;
                result.DocmentType = input.DocmentType;
                result.IsCompleted = false;
                result.TenantId = AbpSession.TenantId.Value;
                result.OrganizationUnitId = input.OrganizationUnitId;
                await Repository.InsertAsync(result);
                listTransaction.Add(MapToEntityDto(result));
            }
            return listTransaction;
        }


        public override async Task<TransactionDto> UpdateAsync(TransactionUpdateDto input)
        {
            var masterNumber = await _masterDataModel.GetAll()
                                      .Include(x => x.MaterialType)
                                      .Where(x => x.MaterialNumber == input.MaterialNumber)
                                      .FirstOrDefaultAsync();
            var transType = await _transactionTypeModel.FirstOrDefaultAsync(x => x.TransactionType == input.TransactionType);
            var Trans = await Repository.GetAll().Where(g => g.Id == input.Id).FirstOrDefaultAsync();
            Trans.MaterialNumber = masterNumber;
            Trans.TransactionType = transType;
            Trans.TransationGroup = Guid.NewGuid();
            Trans.TransactionQuantiry = input.TransactionQuantiry;
            Trans.MaterialType = masterNumber.MaterialType.MaterialTypes;
            Trans.MaterialLot = input.MaterialLot;
            Trans.FromPlant = input.FromPlant;
            Trans.FromSubLocation = input.FromSubLocation;
            Trans.ToPlant = input.ToPlant;
            Trans.ToSubLocation = input.ToSubLocation;
            Trans.DocmentType = input.DocmentType;
            Trans.IsCompleted = false;
            MapToEntity(input, Trans);
            await Repository.UpdateAsync(Trans);
            await CurrentUnitOfWork.SaveChangesAsync();
            return await GetAsync(input);
        }

        public async Task updateIsCompleted(UpdateIsCompletedDto input)
        {
            var rs = await Repository.GetAll().Where(x => x.Id == input.TransactionId).FirstOrDefaultAsync();
            rs.IsCompleted = true;
            await Repository.UpdateAsync(rs);

        }
        protected override IQueryable<MaterialTransactionsModel> CreateFilteredQuery(PagedTransactionResultRequestDto input)
        {

            //var OrgId = GetOrganization().Result.Id;

            var query = Repository.GetAllIncluding(x => x.TransactionType).Where(x => x.OrganizationUnitId == input.OrganizationUnitId);

            if (query != null)
            {
                if (!input.Keyword.IsNullOrWhiteSpace())
                {
                    query = query.Where(x => x.DocmentType.Contains(input.Keyword.Trim()) ||
                                                        x.FromPlant.Contains(input.Keyword.Trim()) ||
                                                        x.MaterialNumber.MaterialNumber.Contains(input.Keyword.Trim()) ||
                                                        x.TransactionType.TransactionType.Contains(input.Keyword.Trim()));
                }
            }
            return query;
        }

        public override Task<PagedResultDto<TransactionDto>> GetAllAsync(PagedTransactionResultRequestDto input)
        {

            return base.GetAllAsync(input);
        }
        protected override TransactionDto MapToEntityDto(MaterialTransactionsModel entity)
        {
            var masterNumber = _masterDataModel.GetAll()
                                                .Include(x => x.MaterialType)
                                                .Where(x => x.Id == entity.MaterialNumberId)
                                                .FirstOrDefault();
            var transType = _transactionTypeModel.FirstOrDefault(x => x.Id == entity.TransactionTypeId);

            var Issues = _IssuesMode.GetAll().Where(x => x.TransactionId == entity.Id).ToList();
            decimal total = 0;
            foreach (var issue in Issues)
            {
                total += issue.IssueQuantity;
            }
            var result = base.MapToEntityDto(entity);
            result.Total = total;
            result.MaterialNumber = masterNumber.MaterialNumber;
            result.TransactionType = transType.TransactionType;
            return result;
        }

        protected override void MapToEntity(TransactionUpdateDto updateInput, MaterialTransactionsModel entity)
        {
            base.MapToEntity(updateInput, entity);
        }

        protected override MaterialTransactionsModel MapToEntity(TransactionCreateDto createInput)
        {
            return base.MapToEntity(createInput);
        }

        public async Task checkValidData(TransactionCreateDto input)
        {
          
            if (input.TransactionType == "MF")
            {
                var InventoryExited = await _inventoryModel.GetAll().Where(x => x.MaterialNumber == input.MaterialNumber && x.Plant == input.FromPlant).FirstOrDefaultAsync();
                if (InventoryExited == null)
                {
                    throw new UserFriendlyException("Ooppps! There is a problem!", $"inventory {input.FromPlant} does not exist {input.MaterialNumber}. ");
                }
                if (input.TransactionQuantiry >= InventoryExited.InventoryQuantity)
                {
                    throw new UserFriendlyException("Ooppps! There is a problem!", "Transaction quality must be less than inventory quality.");
                }
            }
        }
    }
}
