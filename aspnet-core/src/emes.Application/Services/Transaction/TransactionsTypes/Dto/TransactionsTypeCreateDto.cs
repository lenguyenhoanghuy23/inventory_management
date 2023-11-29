

namespace emes.Services.Transaction.TransactionsTypes.Dto
{

    [AutoMapTo(typeof(MaterialTransactionsTypesModel))]
    public class TransactionsTypeCreateDto
    {

        [MaxLength(EntityConsts.VarcharLength25)]
        public string TransactionType { get; set; }
        [MaxLength(EntityConsts.VarcharDescripton)]
        public string Description { get; set; }

    }
}
