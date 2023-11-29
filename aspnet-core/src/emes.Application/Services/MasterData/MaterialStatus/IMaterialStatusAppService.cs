

namespace emes.Services.MasterData.MaterialStatus
{
    public interface IMaterialStatusAppService : IAsyncCrudAppService<MaterialStatusDto, Guid, PageMaterialStatusResultRequestDto, MaterialStatusCreateDto, MaterialStatusDto>
    {
    }
}
