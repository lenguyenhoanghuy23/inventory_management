using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace emes.Services.Transaction.GoodIssues.Dto
{
    [AutoMapFrom(typeof(MaterialTransactionsModel))]
    public class Transaction_IssuesDto : EntityDto<Guid>
    {
        [Required]
        public string TransactionNumber { get; set; }
        //TransactionType
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

        public string MaterialType { get; set; }
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

        public decimal Total { get; set; }
        public bool IsCompleted { get; set; }

        public ICollection<GoodIssuesDto> children { get; set; }

    }
}
