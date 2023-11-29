using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace emes.Services.MasterData.MaterialMasterData.Dto
{
    public class PagedMaterialMasterDataResultRequsetDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
        public bool? IsActive { get; set; }

        public long OrganizationUnitId { get; set; }
    }
}
