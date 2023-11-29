using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace emes.Controllers
{
    public abstract class emesControllerBase: AbpController
    {
        protected emesControllerBase()
        {
            LocalizationSourceName = emesConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
