using AutoMapper;
using emes.Models.Material;

namespace emes.Services.MasterData.MaterialType.Dto
{
    public class MaterialTypeProfile : Profile
    {
        public MaterialTypeProfile()
        {
            CreateMap<MaterialTypeDto, MaterialTypeModel>();
            CreateMap<MaterialTypeCreateDto, MaterialTypeModel>();
        }
    }
}
