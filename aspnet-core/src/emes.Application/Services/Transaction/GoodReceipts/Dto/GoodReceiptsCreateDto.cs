using Abp.AutoMapper;
using Castle.MicroKernel.SubSystems.Conversion;
using emes.Models.Transactions;
using System;
using System.Collections.Generic;


namespace emes.Services.Transaction.GoodReceipts.Dto
{
    [AutoMapTo(typeof(GoodReceiptsModel))]
    public class GoodReceiptsCreateDto
    {
        public Guid TransactionID { get; set; }
        public long OrganizationUnitId { get; set; }
    }
}
