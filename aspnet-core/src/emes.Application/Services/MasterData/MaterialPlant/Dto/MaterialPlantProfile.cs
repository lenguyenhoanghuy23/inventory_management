


namespace emes.Services.MasterData.MaterialPlant.Dto
{
    public class MaterialPlantProfile:Profile
    {
        public MaterialPlantProfile() {
            CreateMap<MaterialPlantDto, MaterialPlantModel>();
            CreateMap<MaterialPlantCreateDto, MaterialPlantModel>();
        }
    }
}
