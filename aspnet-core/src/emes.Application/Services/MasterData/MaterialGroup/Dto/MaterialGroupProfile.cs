

namespace emes.Services.MasterData.MaterialGroup.Dto
{
    public class MaterialGroupProfile:Profile
    {
        public MaterialGroupProfile() {
            CreateMap<MaterialGroupDto, MaterialGroupModel>();
            CreateMap<MaterialGroupCreateDto, MaterialGroupModel>();
        }
    }
}
