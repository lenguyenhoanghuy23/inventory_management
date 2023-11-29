


namespace emes.Services.MasterData.MaterialStatus.Dto
{
    [AutoMapTo(typeof(MaterialStatusModel))]
    public class MaterialStatusCreateDto
    {
        public int MaterialStatus { get; set; }
        [Required]
        [StringLength(EntityConsts.VarcharDescripton)]
        public string Description { get; set; }
    }
}
