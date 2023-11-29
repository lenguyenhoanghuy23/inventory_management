using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace emes.Services.Transaction.inventory.Dto
{
    public class InventoryProfile : Profile
    {
        public InventoryProfile()
        {
            CreateMap<inventoryDto, MaterialInventoryModel>();
            CreateMap<InventoryCreateDto, MaterialInventoryModel>()
                .ForMember(x => x.MaterialNumber, opt => opt.Ignore());
        }
    }
}

