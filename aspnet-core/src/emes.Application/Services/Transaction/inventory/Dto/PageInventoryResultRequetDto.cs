using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace emes.Services.Transaction.inventory.Dto
{
    public class PageInventoryResultRequetDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
        public bool? IsActive { get; set; }
        public long OrganizationUnitId { get; set; }
    }

}
