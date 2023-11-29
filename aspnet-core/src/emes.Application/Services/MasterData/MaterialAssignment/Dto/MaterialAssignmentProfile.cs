using AutoMapper;
using emes.Models.Material;

namespace emes.Services.MasterData.MaterialAssignment.Dto
{
    public class MaterialAssignmentProfile : Profile
    {
        public MaterialAssignmentProfile()
        {
            CreateMap<MaterialAssignmentDto, MaterialAssignmentModel>();
            CreateMap<MaterialAssignmentDto, MaterialAssignmentModel>()
                 .ForMember(x => x.MaterialMasterDataId, opt => opt.Ignore());

            CreateMap<MaterialAssignmentCreateDto, MaterialAssignmentModel>();
            CreateMap<MaterialAssignmentCreateDto, MaterialAssignmentModel>()
                .ForMember(x => x.MaterialMasterDataId, opt => opt.Ignore());


        }
    }
}
