using AutoMapper;
using InternetShopBackend.Data.Entities;
using InternetShopBackend.Data;
using InternetShopBackend.Modals;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Newtonsoft.Json;

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
        public async Task<IActionResult> PushOrderInDb([FromBody] PushOrder pushModal)
        {
            return await Task.Run(() =>
            {
                AppOrder order = _mapper.Map<AppOrder>(pushModal);

                _context.Orders.Add(order);
                _context.SaveChanges();
                var targets = JsonConvert.DeserializeObject(pushModal.Targets, typeof(List<ProductTarget>)) as List<ProductTarget>;
                foreach (var target in targets!)
                {
                    AppFilterProduct appFilterProduct = _context.FilterProducts.Include(x => x.Filter)
                    .Include(x => x.Product)
                    .First(x => x.Filter.Title == target.size && x.Product.Id == target.id);
                    
                    if (appFilterProduct != null && appFilterProduct.Count > 0)
                    {
                        AppOrderProduct orderProduct = new AppOrderProduct
                        {
                            Size = int.Parse(target.size),
                            Order = order,
                            ProductId = appFilterProduct.ProductId,
                            FilterId = appFilterProduct.FilterId
                        };


                        _context.OrderProducts.Add(orderProduct);
                        _context.SaveChanges();
                        if (
                        appFilterProduct!.Count > 0)
                        {
                            appFilterProduct!.Count -= 1;
                        }
                        _context.FilterProducts.Update(appFilterProduct);
                    }

                    _context.SaveChanges();
                }

                return Ok(new
                {
                    Message = "Успішно оформлено!",
                    Id = order.Id
                });
            });
        }
    }
}
