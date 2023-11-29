

namespace emes.Services.Transaction.GoodIssues.Dto
{
    [AutoMapFrom(typeof(GoodIssuesModel))]
    public class GoodIssuesDto:EntityDto<Guid>
    {
      
        public Guid TranstiomId { get; set; }
        public string IssuesType { get; set; }
        public string Transaction { get; set; }
        public decimal IssueQuantity { get; set; }
        public string MaterialNumber { get; set; }
        public string MaterialType { get; set; }
        public string MaterialLot { get; set; }
        public string Plant { get; set; }
        public string SubLocation { get; set; }
        public bool IsOnhandsProcessed { get; set; }
    }
}
