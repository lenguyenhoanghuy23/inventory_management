using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using emes.Models;
using emes.Models.Material;
using emes.Consts;
using System.ComponentModel.DataAnnotations;

namespace emes.Services.MasterData.MaterialType.Dto
{
    [AutoMapFrom(typeof(MaterialTypeModel))]
    public class MaterialTypeDto : EntityDto<Guid>
    {
        [Required]
        [StringLength(EntityConsts.VarcharLength25)]
        public string MaterialTypes { get; set; }
        [Required]
        [StringLength(EntityConsts.VarcharDescripton)]
        public string Description { get; set; }
    }
}
