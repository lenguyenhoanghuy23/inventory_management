
namespace emes.Models.Material
{
    [Audited]
    [Table("MaterialPlant")]
    public class MaterialPlantModel : FullAuditedEntity<Guid>, IMustHaveTenant, IMustHaveOrganizationUnit
    {
        [MaxLength(EntityConsts.VarcharLength25)]
        public string PlantCode { get; set; }
        [MaxLength(EntityConsts.VarcharLength25)]
        public string PlantName { get; set; }

        [MaxLength(EntityConsts.VarcharDescripton)]
        public string description { get; set; }
        public int TenantId { get; set; }
        public long OrganizationUnitId { get; set; }
    }
}
