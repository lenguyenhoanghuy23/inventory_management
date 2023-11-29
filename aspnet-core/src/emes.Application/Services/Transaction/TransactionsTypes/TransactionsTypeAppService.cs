using Abp.Application.Services;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using emes.Models.Transactions;
using emes.Services.Transaction.TransactionsTypes.Dto;
using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;

namespace emes.Services.Transaction.TransactionsTypes
{
    public class TransactionsTypeAppService : AsyncCrudAppService<MaterialTransactionsTypesModel, TransactionsTypeDto, Guid, PagedTransactionsTypeResultRequestDto, TransactionsTypeCreateDto, TransactionsTypeDto>
    {
        private readonly IRepository<MaterialTransactionsTypesModel, Guid> _repository;
        public TransactionsTypeAppService(
            IRepository<MaterialTransactionsTypesModel, Guid> repository
         ) : base(repository)
        {
            _repository = repository;
        }

        public override async Task<TransactionsTypeDto> CreateAsync(TransactionsTypeCreateDto input)
        {
            try
            {
                var existed = await Repository.FirstOrDefaultAsync(x => x.TransactionType == input.TransactionType);
                if (existed == null)
                {
                    var result = ObjectMapper.Map<MaterialTransactionsTypesModel>(input);
                    result.TenantId = AbpSession.TenantId.Value;
                    await _repository.InsertAsync(result);
                    await CurrentUnitOfWork.SaveChangesAsync();
                    return base.MapToEntityDto(result);
                }

                throw new EntityNotFoundException($"{input.TransactionType} đã tồn tại");
            }
            catch (Exception)
            {

                throw;
            }
        }

        public override async Task<TransactionsTypeDto> UpdateAsync(TransactionsTypeDto input)
        {

            var existed = await Repository.GetAll().FirstOrDefaultAsync(x => x.Id == input.Id); 
            if (existed != null)
            {
                existed.TransactionType = input.TransactionType;
                
                existed.Description = input.Description;

                await _repository.UpdateAsync(existed);
            }

            return await GetAsync(input);
        }
    }


}
