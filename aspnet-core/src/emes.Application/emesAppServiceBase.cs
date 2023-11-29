using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Abp.Application.Services;
using Abp.IdentityFramework;
using Abp.Runtime.Session;
using emes.Authorization.Users;
using emes.MultiTenancy;
using Abp.Organizations;
using System.Linq;
using Abp.Authorization.Users;

namespace emes
{
    /// <summary>
    /// Derive your application services from this class.
    /// </summary>
    public abstract class emesAppServiceBase : ApplicationService
    {
        public TenantManager TenantManager { get; set; }

        public UserManager UserManager { get; set; }

        public UserOrganizationUnit OrganizationUnit { get; set; }

        protected emesAppServiceBase()
        {
            LocalizationSourceName = emesConsts.LocalizationSourceName;
        }

        protected virtual async Task<User> GetCurrentUserAsync()
        {
            var user = await UserManager.FindByIdAsync(AbpSession.GetUserId().ToString());
            if (user == null)
            {
                throw new Exception("There is no current user!");
            }

            return user;
        }

        protected virtual Task<Tenant> GetCurrentTenantAsync()
        {
            return TenantManager.GetByIdAsync(AbpSession.GetTenantId());
        }


        protected virtual async Task<OrganizationUnit> GetOrganization()
        {
            var user = await UserManager.FindByIdAsync(AbpSession.GetUserId().ToString());
            return UserManager.GetOrganizationUnitsAsync(user).Result.FirstOrDefault();
        }

        protected virtual async Task<List<OrganizationUnit>> GetUserOrganizations()
        {
            var user = await UserManager.FindByIdAsync(AbpSession.GetUserId().ToString());

            var rs = (await UserManager.GetOrganizationUnitsAsync(user)).ToList();

            return rs.OrderBy(x=>x.DisplayName).ToList();
        }


        protected virtual void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
