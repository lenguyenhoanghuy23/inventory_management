


namespace emes.Services.MasterData.MaterialStatus.Dto
{
    [AutoMapFrom(typeof(MaterialStatusModel))]
    public class MaterialStatusDto : EntityDto<Guid>
    {
        public int MaterialStatus { get; set; }
        [Required]
        [StringLength(EntityConsts.VarcharDescripton)]
        public string Description { get; set; }
    }
}
