
using Abp.Authorization;
using Abp.Domain.Entities;
using emes.Authorization;
using emes.Authorization.Users;
using emes.Services.Transaction.GoodIssues.Dto;


namespace emes.Services.Transaction.GoodIssues
{
    public class GoodIssuesAppService : AsyncCrudAppService<GoodIssuesModel, GoodIssuesDto, Guid, PagedGoodIssuesResultRequestDto, GoodIssuesCreateDto, GoodIssuesUpdateDto>, IGoodIssuesAppService
    {
        private readonly IRepository<GoodIssuesModel, Guid> _repository;
        readonly IRepository<MaterialTransactionsModel, Guid> _materialTransactions;
     
        private readonly UserManager _userManager;
        public GoodIssuesAppService(
            IRepository<GoodIssuesModel, Guid> repository,
            IRepository<MaterialTransactionsModel, Guid> materialTransactions,
        
        UserManager userManager
        ) : base(repository)
        {
            _userManager = userManager;
            _repository = repository;
            _materialTransactions = materialTransactions;
         
        }
        public override async Task<GoodIssuesDto> CreateAsync(GoodIssuesCreateDto input)
        {
            CheckCreatePermission();
            try
            {
                var tranExisted = await _materialTransactions.GetAll()
                        .Include(x => x.MaterialNumber).ThenInclude(x => x.MaterialType)
                        .Include(x => x.TransactionType)
                        .Where(x => x.Id == input.TransactionID).FirstOrDefaultAsync();

                if (tranExisted != null)
                {
                    var rs = ObjectMapper.Map<GoodIssuesModel>(input);

                    rs.Transaction = tranExisted;
                    rs.IssuesType = tranExisted.TransactionType.TransactionType;
                    rs.MaterialType = tranExisted.MaterialNumber.MaterialType.MaterialTypes;
                    rs.MaterialNumber = tranExisted.MaterialNumber.MaterialNumber;
                    rs.MaterialLot = tranExisted.MaterialLot;
                    rs.Plant = tranExisted.FromPlant;
                    rs.SubLocation = tranExisted.FromSubLocation;
                    rs.IsOnhandsProcessed = false;
                    rs.OrganizationUnitId = tranExisted.OrganizationUnitId;
                    rs.TenantId = AbpSession.TenantId.Value;
                    await _repository.InsertAsync(rs);
                    return base.MapToEntityDto(rs);
                }
                throw new EntityNotFoundException("transaction  không tồn tại");
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task updateIsOnhandsProcessed(GoodIssuesIsCompletedDto input)
        {
            var rs = await Repository.GetAll().Where(x => x.TransactionId == input.TransactionId).ToListAsync();

            foreach (var item in rs)
            {
                item.IsOnhandsProcessed = true;
                await Repository.UpdateAsync(item);
            }

        }

        //protected override IQueryable<GoodIssuesModel> CreateFilteredQuery(PagedGoodIssuesResultRequestDto input)
        //{
        //    var query = Repository.GetAll().Where(x => x.OrganizationUnitId ==  input.OrganizationUnitId);
        //    if (!input.Keyword.IsNullOrWhiteSpace())
        //    {
        //        query = query.Where(x => 
        //                                            x.IssuesType.Contains(input.Keyword.Trim()) || 
        //                                            x.Transaction.DocmentType.Contains(input.Keyword.Trim()) || 
        //                                            x.MaterialNumber.Contains(input.Keyword.Trim()));
        //    }
        //    return query;
        //}
        
        public override async Task<GoodIssuesDto> UpdateAsync(GoodIssuesUpdateDto input)
        {
            CheckUpdatePermission();
         
            var IssuesExited = await _repository.GetAll().Where(x => x.Id == input.Id).FirstOrDefaultAsync();
            if (IssuesExited != null)
            {
                IssuesExited.IssueQuantity = input.IssueQuantity;
                IssuesExited.IsOnhandsProcessed = false;
                MapToEntity(input, IssuesExited);
            }
            return await base.GetAsync(input);

        }

        protected override void MapToEntity(GoodIssuesUpdateDto updateInput, GoodIssuesModel entity)
        {
            base.MapToEntity(updateInput, entity);
        }

        protected override GoodIssuesDto MapToEntityDto(GoodIssuesModel entity)
        {
            var Issues = _materialTransactions.GetAll().Where(x => x.Id == entity.TransactionId).FirstOrDefault();
            var rs = base.MapToEntityDto(entity);
            if (Issues != null)
            {
                rs.TranstiomId = Issues.Id;
                //rs.TranstiomId = entity.TransactionId;
                rs.Transaction = Issues.DocmentType;
            }

            return rs;
        }

        protected Transaction_IssuesDto MapToTransactionDto(MaterialTransactionsModel entity)
        {
            var transactions = _materialTransactions
                                        .GetAll()
                                        .Include(x => x.MaterialNumber).ThenInclude(x => x.MaterialType)
                                        .Include(x => x.TransactionType)
                                        .ToList();
            var dto = ObjectMapper.Map<Transaction_IssuesDto>(entity);
            foreach (var item in transactions)
            {
                if (dto?.Id == item?.Id)
                {
                    dto.TransactionType = item.TransactionType.TransactionType;
                    dto.MaterialNumber = item.MaterialNumber.MaterialNumber;
                }
            }
            return dto;
        }

        public async Task<PagedResultDto<Transaction_IssuesDto>> GetGoodIssuesAsync(PagedGoodIssuesResultRequestDto input)
        {

            var result = new PagedResultDto<Transaction_IssuesDto>();
            var transactionsList = new List<MaterialTransactionsModel>();
            if (input.FromPlant == "Admin")
            {
                transactionsList = await _materialTransactions
                                        .GetAll()
                                        .Include(x => x.MaterialNumber).ThenInclude(x => x.MaterialType)
                                        .Include(x => x.TransactionType)
                                        .ToListAsync();
            }
            else
            {
                transactionsList = await _materialTransactions.GetAll()
               .Include(x => x.MaterialNumber).ThenInclude(x => x.MaterialType)
               .Include(x => x.TransactionType).Where(x => x.FromPlant.Contains(input.FromPlant)).ToListAsync();
            }

            var dtos = transactionsList.Select(x => MapToTransactionDto(x)).ToList();

            foreach (var dto in dtos)
            {
                var issues = FindChildrenAsync(dto.Id);
                dto.children = await issues;
            }
            result = new PagedResultDto<Transaction_IssuesDto>(dtos.Count, dtos);
            return result;
        }
        protected async Task<List<GoodIssuesDto>> FindChildrenAsync(Guid? parentId)
        {
            var issuesDto = new List<GoodIssuesDto>();

            if (parentId.HasValue)
            {
                var issues = await _repository.GetAll().Where(x => x.TransactionId == parentId).ToListAsync();
                issuesDto = issues?.Select(x => MapToEntityDto(x)).ToList();
            }
            return issuesDto;
        }
        public async Task<Transaction_IssuesDto> GetTransactionByIdAsync(Guid id)
        {
            var transactions = await _materialTransactions.GetAll()
                 .Include(x => x.MaterialNumber).ThenInclude(x => x.MaterialType)
                 .Include(x => x.TransactionType).FirstOrDefaultAsync(x => x.Id == id);
            var dto = MapToTransactionDto(transactions);

            dto.children = await FindChildrenAsync(dto?.Id); ;
            return dto;
        }
    }
}
