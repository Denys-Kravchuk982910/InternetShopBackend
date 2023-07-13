using InternetShopBackend.Data.Identity.Entities;
using InternetShopBackend.Modals;
using InternetShopBackend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace InternetShopBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private UserManager<AppUser> _userManager;
        private IJwtBearer _jwtBearer;
        public AuthController(UserManager<AppUser> userManager, IJwtBearer jwtBearer)
        {
            _userManager = userManager;
            _jwtBearer = jwtBearer;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModal login)
        {
            return await Task.Run(() =>
            {
                IActionResult res = BadRequest(new
                {
                    Message="Під час авторизації виникла помилка"
                });
                AppUser user = _userManager.FindByEmailAsync(login.Email).Result;
                if(_userManager.CheckPasswordAsync(user, login.Password).Result)
                {

                    res = Ok(new
                    {
                        Token = _jwtBearer.GenerateToken(user)
                    });
                }
                return res;
            }); ;
        }
    }
}
