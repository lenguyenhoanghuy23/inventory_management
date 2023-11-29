

namespace emes.Models.Material
{
    [Audited]
    [Table("MaterialAssignment")]
    public class MaterialAssignmentModel : FullAuditedEntity<Guid>, IMustHaveTenant, IMustHaveOrganizationUnit
    {
        [Required]
        [ForeignKey(nameof(MaterialMasterDataId))]
        public MaterialMasterDataModel MaterialMasterData { get; set; }
        public Guid MaterialMasterDataId { get; set; }  
        public int TenantId { get; set; }
        public long OrganizationUnitId { get; set; }
    }
}
