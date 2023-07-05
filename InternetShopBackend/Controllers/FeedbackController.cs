using InternetShopBackend.Data;
using InternetShopBackend.Data.Entities;
using InternetShopBackend.Modals;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InternetShopBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private EFContext _context { get; set; }

        public FeedbackController(EFContext context)
        {
            _context = context; 
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddFeedback([FromBody] AddFeedback addFeedback)
        {
            return await Task.Run(()=>
            {
                AppFeedback feedback = new AppFeedback 
                { 
                    Name = addFeedback.Name,
                    Message = addFeedback.Message,
                    Time= addFeedback.Time,
                    Image = addFeedback.Image,
                    Email = addFeedback.Email,
                };

                _context.Feedbacks.Add(feedback);
                _context.SaveChanges();
                return Ok(new
                {
                    Message = "Успішно додано!",
                    Id = feedback.Id
                });
            });
        }
        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> DeleteFeedback([FromBody] DeleteFeedback deleteFeedback)
        {
            return await Task.Run(() =>
            {
                var feedback = _context.Feedbacks.FirstOrDefault(x => x.Id == deleteFeedback.Id);
                if(feedback != null)
                {
                    _context.Feedbacks.Remove(feedback);
                    _context.SaveChanges();
                }
                return Ok(new
                {
                    Message = "Успішно видалено!"
                });
            });
        }
        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> GetFeedbacks()
        {
            return await Task.Run(() =>
            {
                return Ok(new
                {
                    Feedbacks = _context.Feedbacks.Take(100).ToList()
                });
            });
        }

        [HttpGet]
        [Route("exist")]
        public async Task<IActionResult> IsExist([FromQuery] string email)
        {
            return await Task.Run(() =>
            {
                return Ok(_context.Feedbacks.FirstOrDefault(x => x.Email == email) != null);
            });
        }

        [HttpPost]
        [Route("update")]
        public async Task<IActionResult> Update([FromBody] AddFeedback update)
        {
            return await Task.Run(() =>
            {
                IActionResult res = Ok();
                var feedback = _context.Feedbacks.FirstOrDefault(x => x.Email == update.Email);

                if(feedback != null)
                {
                    feedback.Message = update.Message;
                    feedback.Time = update.Time;

                    _context.Feedbacks.Update(feedback);
                    _context.SaveChanges();
                    res= Ok(new
                    {
                        Message = "Успішно змінено!"
                    });
                }
                else
                {
                    res = BadRequest(new
                    {
                        Message = "Не знайдено товар!"
                    });
                }


                return res;
                
            });
        }

    }
}
