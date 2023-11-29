﻿

using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using emes.Consts;
using emes.Models.Material;
using System;
using System.ComponentModel.DataAnnotations;

namespace emes.Services.MasterData.MaterialMasterData.Dto
{
    [AutoMapFrom(typeof(MaterialMasterDataModel))]
    public class MaterialMasterDataUpdateDto:EntityDto<Guid>
    {
        [Required]
        [StringLength(EntityConsts.VarcharLength25)]
        public string MaterialNumber { get; set; }

        [Required]
        [StringLength(EntityConsts.VarcharDescripton)]
        public string Description { get; set; }
      
        public string PrimaryUom { get; set; }
        public string SecondaryUom { get; set; }

        public string MaterialGroup { get; set; }
        public int MaterialStatus { get; set; }
        public string MaterialType { get; set; }
    }
}
