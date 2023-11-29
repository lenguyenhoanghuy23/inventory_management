

namespace emes.Models.Transactions
{

    [Table("MaterialGoodIssues")]
    [Audited]
    public class GoodIssuesModel : FullAuditedEntity<Guid>, IMustHaveTenant , IMustHaveOrganizationUnit
    {


        public string IssuesType { get; set; }

        [ForeignKey(nameof(TransactionId))]
        public MaterialTransactionsModel Transaction { get; set; }
        public Guid TransactionId { get; set; }

        [Column(TypeName = "decimal(18, 4)")]
        public decimal IssueQuantity { get; set; }
        public string MaterialNumber { get; set; }
        public string MaterialType { get; set; }
        public string MaterialLot { get; set; }
        public string Plant { get; set; }
        public string SubLocation { get; set; }
        public bool IsOnhandsProcessed { get; set; }
        public int TenantId { get; set; }
        public long OrganizationUnitId { get; set; }
    }
}
