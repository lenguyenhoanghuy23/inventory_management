using Abp.Application.Services;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace emes.Services.Transaction.MaterialTransactions
{
    public interface IMaterialTransactionAppService : IAsyncCrudAppService<TransactionDto, Guid, PagedTransactionResultRequestDto,TransactionCreateDto, TransactionUpdateDto>
    {
        Task<List<TransactionDto>> CreateListAsync(List<TransactionCreateDto> inputs);

        Task checkValidData(TransactionCreateDto input);
    }
}
