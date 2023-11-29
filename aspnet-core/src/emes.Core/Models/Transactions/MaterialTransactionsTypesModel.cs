

namespace emes.Models.Transactions
{
    [Audited]
    [Table("MaterialTransactionsTypes")]
    public class MaterialTransactionsTypesModel : FullAuditedEntity<Guid>  , IMustHaveTenant
    {
        [MaxLength(EntityConsts.VarcharLength25)]
        public string TransactionType { get; set; }
        [MaxLength(EntityConsts.VarcharDescripton)]
        public string Description { get; set; }
        public int TenantId { get; set;  }
    }
}
