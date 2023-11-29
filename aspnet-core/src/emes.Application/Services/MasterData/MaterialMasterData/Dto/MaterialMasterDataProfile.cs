using AutoMapper;

namespace emes.Services.MasterData.MaterialMasterData.Dto
{
    using Abp.Extensions;
    using emes.Models.Material;


    public class MaterialMasterDataProfile : Profile
    {
        public MaterialMasterDataProfile()
        {
            CreateMap<MaterialMasterDataDto, MaterialMasterDataModel>();
            CreateMap<MaterialMasterDataModel, MaterialMasterDataDto>()

                 .ForMember(x => x.MaterialStatus, opt => opt.Ignore())
                 .ForMember(x => x.MaterialGroup, opt => opt.Ignore())
                 .ForMember(x => x.MaterialType, opt => opt.Ignore())
                 .ForMember(dest => dest.MaterialStatus, opt => opt.MapFrom(src => src.materialStatus.MaterialStatus));


            CreateMap<MaterialMasterDataCreateDto, MaterialMasterDataModel>();
            CreateMap<MaterialMasterDataCreateDto, MaterialMasterDataModel>()
                  .ForMember(x => x.materialStatus, opt => opt.Ignore())
                 .ForMember(x => x.MaterialGroup, opt => opt.Ignore())
                 .ForMember(x => x.MaterialType, opt => opt.Ignore())
       

                .ForMember(x => x.materialStatusId, opt => opt.Ignore())
                .ForMember(x => x.MaterialGroupId, opt => opt.Ignore())
                .ForMember(x => x.MaterialTypeId, opt => opt.Ignore());


            CreateMap<MaterialMasterDataUpdateDto, MaterialMasterDataModel>();
            CreateMap<MaterialMasterDataUpdateDto, MaterialMasterDataModel>()
                  .ForMember(x => x.materialStatus, opt => opt.Ignore())
                 .ForMember(x => x.MaterialGroup, opt => opt.Ignore())
                 .ForMember(x => x.MaterialType, opt => opt.Ignore())

                .ForMember(x => x.materialStatusId, opt => opt.Ignore())
                .ForMember(x => x.MaterialGroupId, opt => opt.Ignore())
                .ForMember(x => x.MaterialTypeId, opt => opt.Ignore());






        }
    }
}
