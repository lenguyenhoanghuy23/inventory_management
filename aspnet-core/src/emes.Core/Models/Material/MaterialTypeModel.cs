

namespace emes.Models.Material
{
    [Audited]
    [Table("MaterialTypes")]
    public class MaterialTypeModel: FullAuditedEntity<Guid>, ISoftDelete, IMustHaveTenant
    {
        [Required]
        [StringLength(EntityConsts.VarcharLength25)]
        public string MaterialTypes { get; set; }
        [Required]
        [StringLength(EntityConsts.VarcharDescripton)]
        public string Description { get; set; }
        public int TenantId { get; set ; }
    }
}
