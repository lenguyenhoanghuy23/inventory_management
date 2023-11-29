using emes.Services.Transaction.inventory.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace emes.Services.Transaction.inventory
{
    public interface IinventoryAppService:IAsyncCrudAppService< inventoryDto ,Guid, PageInventoryResultRequetDto , InventoryCreateDto  , inventoryDto>
    {

    }
}
