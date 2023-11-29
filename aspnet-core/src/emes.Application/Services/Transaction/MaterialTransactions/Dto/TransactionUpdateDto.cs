

namespace emes.Services.Transaction.MaterialTransactions.Dto
{
    [AutoMapFrom(typeof(MaterialTransactionsModel))]
    public class TransactionUpdateDto:EntityDto<Guid>
    {
        public string TransactionType { get; set; }
        //----------------------------------------------//
        /// MaterialMasterData

        public string MaterialNumber { get; set; }
        //-------------------------------------------------//
        [Required]
        [Column(TypeName = "decimal(18, 4)")]
        public decimal TransactionQuantiry { get; set; }
        [Required]
        [MaxLength(EntityConsts.VarcharLength25)]
        public string MaterialLot { get; set; }

        [Required]
        [MaxLength(EntityConsts.VarcharLength25)]
        public string FromPlant { get; set; }
        [Required]
        [MaxLength(EntityConsts.VarcharLength25)]
        public string FromSubLocation { get; set; }
        public string ToPlant { get; set; }
        public string ToSubLocation { get; set; }

        [Required]
        [MaxLength(EntityConsts.VarcharLength25)]
        public string DocmentType { get; set; }
    }
}
