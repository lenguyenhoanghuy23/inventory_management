using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace emes.Services.Transaction.inventory.Dto
{
    
    [AutoMapTo(typeof(MaterialInventoryModel))]
    public class InventoryCreateDto
    {
        public string MaterialNumber { get; set; } // 0000NL05 

        public string Type { get; set; }    
        public string FromPlant { get; set; }
        public string ToPlant { get; set; }
       // public string MaterialType { get; set; } //RAW (Raw Material) -- Nguyên Liệu Thô
        public long OrganizationUnitId { get; set; }
    }
}