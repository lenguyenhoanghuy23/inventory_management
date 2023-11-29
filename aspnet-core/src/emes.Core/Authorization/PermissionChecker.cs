using Abp.Authorization;
using emes.Authorization.Roles;
using emes.Authorization.Users;

namespace emes.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
