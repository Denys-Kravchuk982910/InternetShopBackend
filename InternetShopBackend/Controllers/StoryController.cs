using InternetShopBackend.Data;
using InternetShopBackend.Data.Entities;
using InternetShopBackend.Modals;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InternetShopBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoryController : ControllerBase
    {
        private EFContext _context { get; set; }
        public StoryController(EFContext context)
        {
            _context = context;
        }


        [HttpPost]
        [Route("add")]
        [Authorize]
        public async Task<IActionResult> AddStory([FromBody] AddStoryModal addStory)
        {
            return await Task.Run(() =>
            {
                string name = Path.GetRandomFileName() + ".jpg";
                string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Images", name);
                byte[] imageBytes = Convert.FromBase64String(addStory.Image);
                System.IO.File.WriteAllBytes(filePath, imageBytes);


                AppStory story = new AppStory{
                    Image = name,
                    Title = addStory.Title,
                };
                
                _context.Stories.Add(story);
                _context.SaveChanges();

                return Ok(new
                {
                    Message = "Успішно додано!",
                    Id = story.Id
                });
            });
        }
        [HttpPost]
        [Route("delete")]
        [Authorize]
        public async Task<IActionResult> DeleteStory([FromBody] DeleteStoryModal deleteStory)
        {
            return await Task.Run(() =>
            {
                IActionResult res = Ok();
                var story = _context.Stories.FirstOrDefault(x => x.Id == deleteStory.Id);
                if(story != null)
                {
                    _context.Stories.Remove(story);
                    _context.SaveChanges();
                    res = Ok(new { 
                        Message = "Успішно видалено!"
                    });
                }else
                {
                    res = BadRequest(new {
                        Message = "Не можемо знайти!"
                    });
                }
                return res;
            });
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> GetStories()
        {
            return await Task.Run(() =>
            {
                var groupped = _context.Stories.GroupBy(x => x.Title);

                List<GetStoryModal> stories = new List<GetStoryModal>();    
                foreach (var group in groupped)
                {
                    GetStoryModal getStory = new GetStoryModal();
                    getStory.Title = group.Key;
                    getStory.Images = new List<GetStoryImage>();

                    foreach (var image in group)
                    {
                        GetStoryImage img = new GetStoryImage 
                        {
                            Image = image.Image
                        };

                        getStory.Images.Add(img);
                    }
                    stories.Add(getStory);
                    stories.Reverse();
                }

                return Ok(stories);
            });
        }

        [HttpGet]
        [Route("getallstories")]
        public async Task<IActionResult> GetAllStories()
        {
            return await Task.Run(() =>
            {
                var stories = _context.Stories.Select(x => new
                {
                    Title = x.Title,
                    Id = x.Id,
                    Image=x.Image
                }).ToList();
                return Ok(stories);
            });
        }
    }
}
