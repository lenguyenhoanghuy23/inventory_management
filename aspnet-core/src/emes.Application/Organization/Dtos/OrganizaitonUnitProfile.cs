using Abp.Organizations;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace emes.Organization.Dtos
{
    public class OrganizaitonUnitProfile :Profile
    {
        public OrganizaitonUnitProfile()
        {
            CreateMap<OrgniationDto, OrganizationUnit>();
            CreateMap<OrgnizationUnitCreateDto, OrganizationUnit>();
          
            
        }
    }
}
