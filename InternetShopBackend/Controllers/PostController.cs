using InternetShopBackend.Modals;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InternetShopBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddStory([FromBody] AddPostModal addPost)
        {
            return await Task.Run(() =>
            {
                return Ok(addPost);
            });
        }
        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> DeleteStory([FromBody] DeletePostModal deletePost)
        {
            return await Task.Run(() =>
            {
                return Ok(deletePost);
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
