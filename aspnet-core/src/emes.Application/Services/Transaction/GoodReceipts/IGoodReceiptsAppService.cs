

namespace emes.Services.Transaction.GoodReceipts
{
    public interface IGoodReceiptsAppService:IAsyncCrudAppService<GoodReceiptsDto, Guid , PageGoodReceiptsResulRequestDto,GoodReceiptsCreateDto,GoodReceiptsDto , GoodReceiptsUpdateDto>
    {
        Task<PagedResultDto<Transaction_ReceiptDto>> GetGoodReceiptAsync(PageGoodReceiptsResulRequestDto input);
    }
}
