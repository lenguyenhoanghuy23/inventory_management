using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace emes.Sessions.Dto
{
    [AutoMapFrom(typeof(OrganizationUnit))]
    public class OrganizationDto:EntityDto<long>
    {
        public string DisplayName { get; set; }
    }
}
