using InternetShopBackend.Modals;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InternetShopBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilterController : ControllerBase
    {
        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddFeedback([FromBody] AddFilter addFilter)
        {
            return await Task.Run(() =>
            {
                return Ok(addFilter);
            });
        }
        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> DeleteFeedback([FromBody] DeleteFilter deleteFilter)
        {
            return await Task.Run(() =>
            {
                return Ok(deleteFilter);
            });
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> GetFeedbacks()
        {
            return await Task.Run(() =>
            {
                return Ok();
            });
        }
    }
}
