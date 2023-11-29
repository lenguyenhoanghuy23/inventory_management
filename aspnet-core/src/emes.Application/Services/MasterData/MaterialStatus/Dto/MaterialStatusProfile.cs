namespace emes.Services.MasterData.MaterialStatus.Dto
{
    using AutoMapper;
    using emes.Models.Material;

    public class MaterialStatusProfile : Profile
    {
        public MaterialStatusProfile()
        {
            CreateMap<MaterialStatusDto, MaterialStatusModel>();
            CreateMap<MaterialStatusCreateDto, MaterialStatusModel>();
        }
    }
}
