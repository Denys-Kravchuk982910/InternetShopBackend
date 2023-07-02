using AutoMapper;
using InternetShopBackend.Data.Entities;
using InternetShopBackend.Data;
using InternetShopBackend.Modals;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InternetShopBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private EFContext _context;
        private IMapper _mapper;
        public OrderController(EFContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpPost]
        [Route("push")]
        public async Task<IActionResult> PushOrder([FromBody] PushOrder pushModal)
        {
            return await Task.Run(() =>
            {
                AppOrder order = _mapper.Map<AppOrder>(pushModal);
                _context.Orders.Add(order);
                _context.SaveChanges();
                return Ok(new
                {
                    Message = "Успішно оформлено!",
                    Id = order.Id
                });
            });
        }
    }
}
