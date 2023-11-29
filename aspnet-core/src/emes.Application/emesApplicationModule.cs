using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using emes.Authorization;

namespace emes
{
    [DependsOn(
        typeof(emesCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class emesApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<emesAuthorizationProvider>();

        }

        public override void Initialize()
        {
            var thisAssembly = typeof(emesApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);
            
            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
