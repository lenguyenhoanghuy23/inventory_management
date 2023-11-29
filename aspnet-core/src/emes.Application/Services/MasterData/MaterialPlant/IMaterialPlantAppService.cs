using Abp.Application.Services;
using emes.Services.MasterData.MaterialPlant.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace emes.Services.MasterData.MaterialPlant
{
    public interface IMaterialPlantAppService :IAsyncCrudAppService<MaterialPlantDto , Guid , PagedMaterialPlantResultRequestDto , MaterialPlantCreateDto, MaterialPlantDto>
    {
    }
}
