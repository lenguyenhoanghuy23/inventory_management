using System.Threading.Tasks;
using Abp.Application.Services;
using emes.Sessions.Dto;

namespace emes.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
        
    }
}
