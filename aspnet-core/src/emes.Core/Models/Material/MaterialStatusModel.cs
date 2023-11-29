

namespace emes.Models.Material
{

    [Audited]
    [Table("MaterialStatus")]
    public class MaterialStatusModel: FullAuditedEntity<Guid>, ISoftDelete, IMustHaveTenant
    {
        public int MaterialStatus { get; set; }
        [Required]
        [StringLength(EntityConsts.VarcharDescripton)]
        public string Description { get; set; }
        public int TenantId { get ; set ; }
    }
}
