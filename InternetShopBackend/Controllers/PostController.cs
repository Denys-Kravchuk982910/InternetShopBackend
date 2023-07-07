using InternetShopBackend.Data;
using InternetShopBackend.Data.Entities;
using InternetShopBackend.Modals;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InternetShopBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private EFContext _context { get; set; }
        public PostController(EFContext context)
        {
            this._context = context;
        }
        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddPost([FromBody] AddPostModal addPost)
        {
            return await Task.Run(() =>
            {
                string name = Path.GetRandomFileName() + ".jpg";
                string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Images", name);
                byte[] imageBytes = Convert.FromBase64String(addPost.Image);
                System.IO.File.WriteAllBytes(filePath, imageBytes);


                AppPost post = new AppPost { Image = name };

                _context.Posts.Add(post);
                _context.SaveChanges();

                return Ok(new
                {
                    Message = "Успішно додано!",
                    Id = post.Id
                });
            });
        }
        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> DeletePost([FromBody] DeletePostModal deletePost)
        {
            return await Task.Run(() =>
            {
                var post = _context.Posts.FirstOrDefault(x => x.Id == deletePost.Id);
                IActionResult res = Ok();

                if(post != null)
                {
                    _context.Posts.Remove(post);
                    _context.SaveChanges();
                    res = Ok(new
                    {
                        Message = "Видалено успішно!"
                    });
                }
                else
                {
                    res = BadRequest(new
                    {
                        Message = "Не знайдено поста!"
                    });
                }
                return res;
            });
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> GetPosts()
        {
            return await Task.Run(() =>
            {
                var posts = _context.Posts.Select(x => new
                {
                    Image = x.Image
                });
                return Ok(posts);
            });
        }
    }
}
