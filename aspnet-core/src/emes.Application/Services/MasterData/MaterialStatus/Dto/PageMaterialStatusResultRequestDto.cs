


namespace emes.Services.MasterData.MaterialStatus.Dto
{
    public class PageMaterialStatusResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
        public bool? IsActive { get; set; }
    }
}
