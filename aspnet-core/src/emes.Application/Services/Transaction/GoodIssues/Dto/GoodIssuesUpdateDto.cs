

namespace emes.Services.Transaction.GoodIssues.Dto
{
    [AutoMapFrom(typeof(GoodIssuesModel))]
    public class GoodIssuesUpdateDto:EntityDto<Guid>
    {
        public decimal IssueQuantity { get; set; }
    }
}
