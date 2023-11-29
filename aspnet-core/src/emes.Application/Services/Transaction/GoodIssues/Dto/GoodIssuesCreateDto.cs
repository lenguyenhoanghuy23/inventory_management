
namespace emes.Services.Transaction.GoodIssues.Dto
{
    [AutoMapTo(typeof(GoodIssuesModel))]
    public class GoodIssuesCreateDto
    {
        
        public Guid TransactionID { get; set; }
        public decimal IssueQuantity { get; set; }


    }
}
