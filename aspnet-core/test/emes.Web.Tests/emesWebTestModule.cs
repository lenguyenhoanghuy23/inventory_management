using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using emes.EntityFrameworkCore;
using emes.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace emes.Web.Tests
{
    [DependsOn(
        typeof(emesWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class emesWebTestModule : AbpModule
    {
        public emesWebTestModule(emesEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(emesWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(emesWebMvcModule).Assembly);
        }
    }
}