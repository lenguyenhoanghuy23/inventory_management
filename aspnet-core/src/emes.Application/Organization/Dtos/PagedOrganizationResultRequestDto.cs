using Abp.Application.Services.Dto;


namespace emes.Organization.Dtos
{
    public class PagedOrganizationResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
        public bool? IsActive { get; set; }
    }
}
