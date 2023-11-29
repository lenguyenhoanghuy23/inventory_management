

namespace emes.Models.Material
{
    [Audited]
    [Table("MaterialMasterData")]
    public class MaterialMasterDataModel : FullAuditedEntity<Guid> , IMustHaveTenant  , IMustHaveOrganizationUnit

    {
        [Required]
        [StringLength(EntityConsts.VarcharLength25)]
        public string MaterialNumber { get; set; }

        [Required]
        [StringLength(EntityConsts.VarcharDescripton)]
        public string Description { get; set; }

        [ForeignKey(nameof(MaterialGroupId))]
        public MaterialGroupModel MaterialGroup { get; set; }
        public Guid MaterialGroupId { get; set; }

        public string PrimaryUom { get; set; }
        public string SecondaryUom { get; set; }

        [Required]
        [ForeignKey(nameof(MaterialTypeId))]
        public MaterialTypeModel MaterialType { get; set; }
        public Guid MaterialTypeId { get; set; }

        [Required]
        [ForeignKey(nameof(materialStatusId))]
        public MaterialStatusModel materialStatus { get; set; }
        public Guid materialStatusId { get; set; }
        public int TenantId { get ; set ; }
        public long OrganizationUnitId { get; set; }

    }
}
