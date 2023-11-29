

namespace emes.Services.MasterData.MaterialPlant.Dto
{
    [AutoMapFrom(typeof(MaterialPlantModel))]
    public class MaterialPlantDto:EntityDto<Guid>
    {

        [MaxLength(EntityConsts.VarcharLength25)]
        public string PlantName { get; set; }

        [MaxLength(EntityConsts.VarcharDescripton)]
        public string description { get; set; }
       
    }
}
