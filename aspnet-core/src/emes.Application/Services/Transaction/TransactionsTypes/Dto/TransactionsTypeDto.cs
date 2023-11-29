

namespace emes.Services.Transaction.TransactionsTypes.Dto
{
    [AutoMapFrom(typeof(MaterialTransactionsTypesModel))]
    public class TransactionsTypeDto : EntityDto<Guid>
    {
        [MaxLength(EntityConsts.VarcharLength25)]
        public string TransactionType { get; set; }
        [MaxLength(EntityConsts.VarcharDescripton)]
        public string Description { get; set; }

    }
}
