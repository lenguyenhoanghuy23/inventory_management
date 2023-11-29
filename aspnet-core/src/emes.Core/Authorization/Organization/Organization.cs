using Abp.Application.Services.Dto;
using Abp.Authorization.Users;
using Abp.Domain.Repositories;
using Abp.Organizations;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;

namespace emes.Authorization.Organization
{

    public class Organization : OrganizationUnit
    {



        public static IRepository< OrganizationUnit  , long>orgUnit { get; set; }
        public OrganizationUnitManager OUManager { get; set; }
        public static IRepository<UserOrganizationUnit, long> userOrg { get; set; }
        public static Organization CreateOrganizations(int tenant)
        {
            
            var organizationUnitAdmin = new Organization
            {
                DisplayName = "Admin",
                ParentId = null,
                TenantId = tenant,
            };
           


            return organizationUnitAdmin;
        }

        public class UserOrganization : UserOrganizationUnit
        {
            public static UserOrganization CreateUserOrganization(int tenant, long UserID, long orgID)
            {
                var userorg = new UserOrganization
                {
                    TenantId = tenant,
                    UserId = UserID,
                    OrganizationUnitId = orgID
                };

                return userorg;
            }
        }
    }
}
