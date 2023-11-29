
using Abp.Application.Services;
using emes.Services.MasterData.MaterialAssignment.Dto;
using System;

namespace emes.Services.MasterData.MaterialAssignment
{
    public interface IMaterialAssignmentAppService : IAsyncCrudAppService<MaterialAssignmentDto, Guid, PagedMaterialAssignmentResultRequetDto, MaterialAssignmentCreateDto, MaterialAssignmentDto>
    {

        Task<MaterialAssignmentDto> CreateAsyncForAdmin(MaterialAssignmentCreateDto input);
    }
}
