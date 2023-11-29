

namespace emes.Services.MasterData.MaterialGroup
{
    public interface IMaterialGroupAppService:IAsyncCrudAppService<MaterialGroupDto, Guid, PagedMaterialGroupResultRequestDto, MaterialGroupCreateDto,MaterialGroupDto>
    {
    }
}
