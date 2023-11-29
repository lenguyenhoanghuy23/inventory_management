

using System.Linq;

namespace emes.Services.Transaction.GoodReceipts
{
    public class GoodReceiptsAppService : AsyncCrudAppService<GoodReceiptsModel, GoodReceiptsDto, Guid, PageGoodReceiptsResulRequestDto, GoodReceiptsCreateDto, GoodReceiptsUpdateDto>
    {
        readonly IRepository<GoodReceiptsModel, Guid> _repository;
        readonly IRepository<GoodIssuesModel, Guid> _issuesRepository;
        readonly IRepository<MaterialTransactionsModel, Guid> _materialTransactions;
        public GoodReceiptsAppService(
                IRepository<GoodReceiptsModel, Guid> repository,
                IRepository<GoodIssuesModel, Guid> issuesRepository,
               IRepository<MaterialTransactionsModel, Guid> materialTransactions
         ) : base(repository)
        {
            _repository = repository;
            _issuesRepository = issuesRepository;
            _materialTransactions = materialTransactions;
        }
        public override async Task<GoodReceiptsDto> CreateAsync(GoodReceiptsCreateDto input)
        {
            CheckCreatePermission();
            try
            {
                var issues = await _issuesRepository.GetAll().Where(x => x.TransactionId == input.TransactionID).ToListAsync();
                var listTransaction = new List<GoodReceiptsDto>();
                foreach (var issue in issues)
                {
                    var receipt = MapToEntity(input);
                    receipt.ReceiptType = issue.IssuesType;
                    receipt.TransactionId = issue.TransactionId;
                    receipt.ReceiptQuantity = issue.IssueQuantity;
                    receipt.MaterialNumber = issue.MaterialNumber;
                    receipt.MaterialType = issue.MaterialType;
                    receipt.MaterialLot = issue.MaterialLot;
                    receipt.Plant = issue.Plant;
                    receipt.SubLocation = issue.SubLocation;
                    receipt.IsOnhandsProcessed = true;
                    receipt.IsOnhandsInventory = false;
                    receipt.OrganizationUnitId = input.OrganizationUnitId;
                    receipt.TenantId = AbpSession.TenantId.Value;
                    await _repository.InsertAsync(receipt);
                    listTransaction.Add(MapToEntityDto(receipt));
                }
                return listTransaction.FirstOrDefault();
                throw new EntityNotFoundException("transaction không tồn tại");
            }
            catch (Exception)
            {
                throw;
            }
        }



        public async Task<PagedResultDto<Transaction_ReceiptDto>> GetGoodReceiptAsync(PageGoodReceiptsResulRequestDto input)
        {
            var result = new PagedResultDto<Transaction_ReceiptDto>();
            var transactions = new List<MaterialTransactionsModel>();
            if (input.ToPlant == "Admin")
            {
                transactions = await _materialTransactions.GetAll()
                .Include(x => x.MaterialNumber).ThenInclude(x => x.MaterialType)
                .Include(x => x.TransactionType).ToListAsync();
            }
            else
            {
                transactions = await _materialTransactions.GetAll()
                .Include(x => x.MaterialNumber).ThenInclude(x => x.MaterialType)
                .Include(x => x.TransactionType).Where(x => x.ToPlant.Contains(input.ToPlant)).ToListAsync();
            }
            var dtos = transactions.Select(t => new Transaction_ReceiptDto
            {
                TransactionNumber = t.TransactionNumber,
                TransactionQuantiry = t.TransactionQuantiry,
                TransactionType = t.TransactionType.TransactionType,
                MaterialNumber = t.MaterialNumber.MaterialNumber,
                ToPlant = t.ToPlant,
                ToSubLocation = t.ToSubLocation,
                DocmentType = t.DocmentType,
                MaterialLot = t.MaterialLot,
                MaterialType = t.MaterialType,
                IsCompleted = t.IsCompleted,
                FromSubLocation = t.FromSubLocation,
                FromPlant = t.FromPlant,
                Id = t.Id,
            }).ToList();
            foreach (var dto in dtos)
            {
                var receipt = FindChildrenAsync(dto.Id);
                dto.children = await receipt;
            }
            result = new PagedResultDto<Transaction_ReceiptDto>(dtos.Count, dtos);
            return result;
        }

        protected async Task<List<GoodReceiptsDto>> FindChildrenAsync(Guid? parentId)
        {
            var receiptDto = new List<GoodReceiptsDto>();

            if (parentId.HasValue)
            {
                var receipt = await _repository.GetAll().Where(x => x.TransactionId == parentId).ToListAsync();
                receiptDto = receipt?.Select(x => MapToEntityDto(x)).ToList();
            }
            return receiptDto;
        }


        protected override void MapToEntity(GoodReceiptsUpdateDto updateInput, GoodReceiptsModel entity)
        {
            base.MapToEntity(updateInput, entity);
        }

        protected override GoodReceiptsModel MapToEntity(GoodReceiptsCreateDto createInput)
        {
            return base.MapToEntity(createInput);
        }
        protected override GoodReceiptsDto MapToEntityDto(GoodReceiptsModel entity)
        {
            var receipt = _materialTransactions.GetAll().Where(x => x.Id == entity.TransactionId).FirstOrDefault();
            var rs = base.MapToEntityDto(entity);
            if (receipt != null)
            {
                rs.TranstiomId = receipt.Id;
                //rs.TranstiomId = entity.TransactionId;
                rs.Transaction = receipt.DocmentType;
            }
            return rs;
        }
    }
}
