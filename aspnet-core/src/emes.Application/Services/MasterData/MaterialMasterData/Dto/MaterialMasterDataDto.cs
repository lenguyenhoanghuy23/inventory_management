using Abp.Application.Services.Dto;
using emes.Consts;
using System;
using System.ComponentModel.DataAnnotations;


namespace emes.Services.MasterData.MaterialMasterData.Dto
{
    using Abp.AutoMapper;
    using emes.Models.Material;


    [AutoMapFrom(typeof(MaterialMasterDataModel))]
    public class MaterialMasterDataDto : EntityDto<Guid>
    {
        [Required]
        [StringLength(EntityConsts.VarcharLength25)]
        public string MaterialNumber { get; set; }

        [Required]
        [StringLength(EntityConsts.VarcharDescripton)]
        public string Description { get; set; }

        public string PrimaryUom { get; set; }
        public string SecondaryUom { get; set; }
        public string desGroup { get; set; }
        public string destype { get; set; }
        public string desStatus { get; set; }
        public string MaterialGroup { get; set; }
        public int? MaterialStatus { get; set; }
        public string MaterialType { get; set; }
       public virtual long OrganizationUnitId { get; set; }
    }
}
