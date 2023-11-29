
namespace emes.Models.Material
{
    [Table("MaterialGroup")]
    [Audited]
    public class MaterialGroupModel:FullAuditedEntity<Guid> , IMustHaveTenant
    {
        public string materialGroup { get; set; }
        public string Description { get; set; }
        public int TenantId { get; set; }
    }
}
