


namespace emes.Models.Transactions
{
    [Audited]
    [Table("MaterialTransactions")]
    public class MaterialTransactionsModel : FullAuditedEntity<Guid>, IMustHaveTenant, IMustHaveOrganizationUnit
    {
        public string TransactionNumber { get; set; }
        //TransactionType
        [ForeignKey(nameof(TransactionTypeId))]
        public MaterialTransactionsTypesModel TransactionType { get; set; }
        public Guid TransactionTypeId { get; set; }
        //----------------------------------------------//
        /// MaterialMasterData
        [ForeignKey(nameof(MaterialNumberId))]
        public MaterialMasterDataModel MaterialNumber { get; set; }
        public Guid MaterialNumberId { get; set; }
        //-------------------------------------------------//

        [Column(TypeName = "decimal(18, 4)")]
        public decimal TransactionQuantiry { get; set; }

        [MaxLength(EntityConsts.VarcharLength25)]
        public string MaterialLot { get; set; }
        public Guid TransationGroup { get; set; }
        public string MaterialType { get; set; }

        [MaxLength(EntityConsts.VarcharLength25)]
        public string FromPlant { get; set; }

        [MaxLength(EntityConsts.VarcharLength25)]
        public string FromSubLocation { get; set; }

        [MaxLength(EntityConsts.VarcharLength25)]
        public string ToPlant { get; set; }

        [MaxLength(EntityConsts.VarcharLength25)]
        public string ToSubLocation { get; set; }

        [MaxLength(EntityConsts.VarcharLength25)]
        public string DocmentType { get; set; }

        public bool IsCompleted { get; set; }
        public int TenantId { get; set; }
        public long OrganizationUnitId { get; set; }

    }
}
