using Abp.AutoMapper;
using emes.Models.Material;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace emes.Services.MasterData.MaterialAssignment.Dto
{
    [AutoMapTo(typeof(MaterialAssignmentModel))]
    public class MaterialAssignmentCreateDto
    {
        public string MaterialNumber { get; set; }
        public long OrganizationUnitId { get; set;}

    }
}
