

namespace emes.Services.Transaction.GoodReceipts.Dto
{
    [AutoMapFrom(typeof(GoodReceiptsModel))]
    public class GoodReceiptsUpdateDto: EntityDto<Guid>
    {
        public string ReceiptType { get; set; }
        public string Transaction { get; set; }
        public decimal ReceiptQuantity { get; set; }
    }
}
