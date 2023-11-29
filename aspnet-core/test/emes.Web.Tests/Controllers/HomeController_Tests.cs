using System.Threading.Tasks;
using emes.Models.TokenAuth;
using emes.Web.Controllers;
using Shouldly;
using Xunit;

namespace emes.Web.Tests.Controllers
{
    public class HomeController_Tests: emesWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}