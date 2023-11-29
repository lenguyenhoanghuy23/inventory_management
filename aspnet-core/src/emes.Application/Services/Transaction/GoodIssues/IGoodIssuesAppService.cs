using Abp.Application.Services;
using emes.Services.Transaction.GoodIssues.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace emes.Services.Transaction.GoodIssues
{
    public interface IGoodIssuesAppService:IAsyncCrudAppService<GoodIssuesDto , Guid , PagedGoodIssuesResultRequestDto , GoodIssuesCreateDto, GoodIssuesUpdateDto>
    {
        Task<PagedResultDto<Transaction_IssuesDto>> GetGoodIssuesAsync(PagedGoodIssuesResultRequestDto input);
    }
}
