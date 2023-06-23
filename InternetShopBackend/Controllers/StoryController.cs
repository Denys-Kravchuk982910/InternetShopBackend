using InternetShopBackend.Modals;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InternetShopBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoryController : ControllerBase
    {
        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddStory([FromBody] AddStoryModal addStory)
        {
            return await Task.Run(() =>
            {
                return Ok(addStory);
            });
        }
        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> DeleteStory([FromBody] DeleteStoryModal deleteStory)
        {
            return await Task.Run(() =>
            {
                return Ok(deleteStory);
            });
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> GetStories()
        {
            return await Task.Run(() =>
            {
                return Ok();
            });
        }
    }
}
