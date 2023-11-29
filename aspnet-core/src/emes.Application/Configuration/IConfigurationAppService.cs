using System.Threading.Tasks;
using emes.Configuration.Dto;

namespace emes.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
