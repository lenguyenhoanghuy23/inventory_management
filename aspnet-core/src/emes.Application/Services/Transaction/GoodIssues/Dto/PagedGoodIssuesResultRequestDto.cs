
namespace emes.Services.Transaction.GoodIssues.Dto
{
    public class PagedGoodIssuesResultRequestDto:PagedResultRequestDto
    {
        public string Keyword { get; set; }
        public bool? IsActive { get; set; }
        public string FromPlant { get; set; }
    }
}
