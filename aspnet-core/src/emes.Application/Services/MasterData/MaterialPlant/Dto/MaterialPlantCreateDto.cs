

namespace emes.Services.MasterData.MaterialPlant.Dto
{
    [AutoMapTo(typeof(MaterialPlantModel))]
    public class MaterialPlantCreateDto
    {
        
        [MaxLength(EntityConsts.VarcharLength25)]
        public string PlantName { get; set; }

        [MaxLength(EntityConsts.VarcharDescripton)]
        public string description { get; set; }
    }
}
