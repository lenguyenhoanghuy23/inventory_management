
namespace emes.Services.Transaction.GoodReceipts.Dto
{
    public class PageGoodReceiptsResulRequestDto:PagedResultRequestDto
    {
        public string Keyword { get; set; }
        public bool? IsActive { get; set; }
        public string ToPlant { get; set; }
    }
}
