


namespace emes.Organization.Dtos
{
    using Abp.AutoMapper;
    using Abp.Organizations;
    [AutoMapTo(typeof (OrganizationUnit))]
    public class OrgnizationUnitCreateDto 
    {
        public string DisplayName { get; set; }
        public  long  ParentId { get; set; }

    }
}
