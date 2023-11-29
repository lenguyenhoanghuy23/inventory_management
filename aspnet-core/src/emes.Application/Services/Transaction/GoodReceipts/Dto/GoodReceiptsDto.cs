


namespace emes.Services.Transaction.GoodReceipts.Dto
{
    [AutoMapFrom(typeof(GoodReceiptsModel))]
    public class GoodReceiptsDto:EntityDto<Guid>
    {
        public string ReceiptType { get; set; }
        public string Transaction { get; set; }
        public Guid TranstiomId { get; set; }

        public decimal ReceiptQuantity { get; set; }
        public string MaterialNumber { get; set; }
        
        public string MaterialType { get; set; }
        public string MaterialLot { get; set; }
        public string Plant { get; set; }
        public string SubLocation { get; set; }
        public bool IsOnhandsProcessed { get; set; }
    }
}
