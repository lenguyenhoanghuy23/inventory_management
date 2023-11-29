

using Abp.Application.Services;
using emes.Services.MasterData.MaterialMasterData.Dto;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace emes.Services.MasterData.MaterialMasterData
{
    public interface IMaterialMasterDataAppService : IAsyncCrudAppService<MaterialMasterDataDto, Guid, PagedMaterialMasterDataResultRequsetDto, MaterialMasterDataCreateDto , MaterialMasterDataUpdateDto>
    {
        Task ImportExcel(IFormFile file , MaterialMasterDataCreateDto createInput);
    }
}
