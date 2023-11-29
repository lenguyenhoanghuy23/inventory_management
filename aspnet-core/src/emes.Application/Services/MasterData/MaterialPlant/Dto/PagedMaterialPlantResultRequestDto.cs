

namespace emes.Services.MasterData.MaterialPlant.Dto
{
    public class PagedMaterialPlantResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
        public bool? IsActive { get; set; }
    }
}
