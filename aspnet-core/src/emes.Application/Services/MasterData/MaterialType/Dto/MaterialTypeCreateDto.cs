using Abp.AutoMapper;
using emes.Consts;
using emes.Models.Material;
using System.ComponentModel.DataAnnotations;


namespace emes.Services.MasterData.MaterialType.Dto
{
    [AutoMapTo(typeof(MaterialTypeModel))]
    public class MaterialTypeCreateDto
    {
        [Required]
        [StringLength(EntityConsts.VarcharLength10)]
        public string materialTypes { get; set; }
        [Required]
        [StringLength(EntityConsts.VarcharDescripton)]
        public string Description { get; set; }

        public int TenantId { get; set; }
    }
}
