

using Abp.AutoMapper;

namespace emes.Services.Transaction.inventory.Dto
{
    [AutoMapFrom(typeof(MaterialInventoryModel))]
    public class inventoryDto:EntityDto<Guid>
    {
        public string MaterialNumber { get; set; } // 0000NL05
        public string MaterialType { get; set; } //RAW (Raw Material) -- Nguyên Liệu Thô

        [Column(TypeName = "decimal(18, 4)")]
        public decimal InventoryQuantity { get; set; } // 100

        public string MaterialLot { get; set; } //Lot001
        public string Plant { get; set; } //Lot001
        public string SubLocation { get; set; } //
    }
}
