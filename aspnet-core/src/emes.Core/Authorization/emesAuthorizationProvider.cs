using Abp.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;

namespace emes.Authorization
{
    public class emesAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            context.CreatePermission(PermissionNames.Pages_Users, L("Users"));
            context.CreatePermission(PermissionNames.Pages_Users_Activation, L("UsersActivation"));
            context.CreatePermission(PermissionNames.Pages_Roles, L("Roles"));
            context.CreatePermission(PermissionNames.Pages_Tenants, L("Tenants"), multiTenancySides: MultiTenancySides.Host);
            context.CreatePermission(PermissionNames.Pages_Organization, L("Organization"));
            context.CreatePermission(PermissionNames.Pages_MasterData, L("MasterData"));

            context.CreatePermission(PermissionNames.Pages_Material, L("Material"));

            // MaterialAssignment
            context.CreatePermission(PermissionNames.Pages_MaterialAssignment, L("Assignment"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, emesConsts.LocalizationSourceName);
        }
    }
}
