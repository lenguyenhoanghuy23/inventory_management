
using emes.Services.Transaction.inventory.Dto;

namespace emes.Services.Transaction.inventory
{

    public class inventoryAppService : AsyncCrudAppService<MaterialInventoryModel, inventoryDto, Guid, PageInventoryResultRequetDto, InventoryCreateDto, inventoryDto>, IinventoryAppService
    {


        private readonly IRepository<MaterialMasterDataModel, Guid> _masterDataModel;
        private readonly IRepository<GoodReceiptsModel, Guid> _goodreceipModel;
        public inventoryAppService(

            IRepository<MaterialInventoryModel, Guid> repository,
            IRepository<MaterialMasterDataModel, Guid> masterDataModel,
            IRepository<GoodReceiptsModel, Guid> goodreceipModel

         ) : base(repository)
        {
            _masterDataModel = masterDataModel;
            _goodreceipModel = goodreceipModel;
        }

        public override async Task<inventoryDto> CreateAsync(InventoryCreateDto input)
        {
            var receipt = await _goodreceipModel.GetAll().Where(x => x.MaterialNumber == input.MaterialNumber &&
                                                                        x.IsOnhandsInventory == false
                                                               )
                                                         .ToListAsync();
            var inventoryExited = await Repository.GetAll().Where(x => x.MaterialNumber == input.MaterialNumber && x.OrganizationUnitId == input.OrganizationUnitId ).FirstOrDefaultAsync();
            var result = ObjectMapper.Map<MaterialInventoryModel>(input);
            decimal totalReceiptQuantity = 0; //  tổng của inventory confirm 
            //decimal remainingAmount = inventoryExited. ;
            if (inventoryExited == null)
            {
                foreach (var item in receipt)
                {
                    totalReceiptQuantity += item.ReceiptQuantity; /*0 + 1 + 2 + 3 + ..n*/
                    result.MaterialNumber = item.MaterialNumber;
                    result.MaterialType = item.MaterialType;
                    result.Plant = item.Plant;
                    result.SubLocation = item.SubLocation;
                    result.MaterialLot = item.MaterialLot;
                    result.TenantId = AbpSession.TenantId.Value;
                    result.OrganizationUnitId = input.OrganizationUnitId;
                    item.IsOnhandsInventory = true;
                    await _goodreceipModel.UpdateAsync(item);
                }
                result.InventoryQuantity = totalReceiptQuantity;
                await Repository.InsertAsync(result);
                await reduceQuantityInventory(input.MaterialNumber, input.FromPlant, totalReceiptQuantity, input.Type);
                return base.MapToEntityDto(result);
            }
            else
            {
                totalReceiptQuantity = receipt.Sum(x => x.ReceiptQuantity);
                inventoryExited.InventoryQuantity += totalReceiptQuantity;
                await reduceQuantityInventory(input.MaterialNumber,
                                             input.FromPlant,
                                             totalReceiptQuantity,
                                             input.Type);
                return base.MapToEntityDto(inventoryExited);
            }
           
        }
        /*
          khi receip confirm thì inventory fac-A bị trừ đi còn fac-B sẽ tăng lên  
       */


         protected async Task reduceQuantityInventory(string MaterialNumber, string fromPlant, decimal quantity , string type)
        {
            if (type == "MF")
            {
                var inventoryExited = await Repository.GetAll()
                    .Where(x => x.MaterialNumber == MaterialNumber && x.Plant == fromPlant)
                    .FirstOrDefaultAsync();

                if (inventoryExited != null)
                {
                    decimal reducedQuantity = inventoryExited.InventoryQuantity - quantity;
                    inventoryExited.InventoryQuantity = reducedQuantity;

                    // Save the updated inventory back to the database
                    await Repository.UpdateAsync(inventoryExited);
                }
            }

        }

        protected override IQueryable<MaterialInventoryModel> CreateFilteredQuery(PageInventoryResultRequetDto input)
        {
            var query = Repository.GetAll().Where(x => x.OrganizationUnitId == input.OrganizationUnitId);

            if (query != null && !input.Keyword.IsNullOrWhiteSpace())
            {
                query = query.Where(x => x.MaterialNumber.Contains(input.Keyword.Trim()));
            }
            return query;
        }


    }
}
