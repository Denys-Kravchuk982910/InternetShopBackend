using InternetShopBackend.Modals;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InternetShopBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddFeedback([FromBody] AddFeedback addFeedback)
        {
            return await Task.Run(()=>
            {
                return Ok(addFeedback);
            });
        }
        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> DeleteFeedback([FromBody] DeleteFeedback deleteFeedback)
        {
            return await Task.Run(() =>
            {
                return Ok(deleteFeedback);
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
