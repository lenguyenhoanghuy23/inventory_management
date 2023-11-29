using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using Abp.Organizations;
namespace emes.Organization.Dtos
{
    [AutoMapFrom(typeof(OrganizationUnit))]
    public class OrgniationDto : EntityDto<long>
    {
        public string DisplayName { get; set; }
        public virtual string Code { get; set; }
        public virtual long? ParentId { get; set; }
        public virtual ICollection<OrgniationDto> Children { get; set; }
    }
}
