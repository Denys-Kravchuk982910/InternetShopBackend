using AutoMapper;
using InternetShopBackend.Data.Entities;
using InternetShopBackend.Data;
using InternetShopBackend.Modals;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.Security.Cryptography.Xml;
using Microsoft.AspNetCore.Authorization;

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

        [HttpGet]
        [Route("get")]
        [Authorize]
        public async Task<IActionResult> GetOrders()
        {
            return await Task.Run(() =>
            {
                
                return Ok(_context.Orders.Include(x => x.OrderProducts)
                    .ThenInclude(x => x.Product).Select(x => new {
                    Email = x.Email,
                    Phone = x.PhoneNumber,
                    Name = x.Name,
                    Surname = x.Surname,
                    Post = x.Post,
                    Id = x.Id,
                    ParentName = x.ParentName,
                    ProductName = x.OrderProducts.First().Product.Title,
                    ProductBrand = x.OrderProducts.First().Product.Brand,
                    ProductSize = x.OrderProducts.First().Size,
                }));
            });
        }

        [HttpPost]
        [Route("accept")]
        [Authorize]
        public async Task<IActionResult> Acceptance([FromBody] OrderAcceptance orderAcceptance)
        {
            return await Task.Run(() =>
            {
                AppOrder? order = _context.Orders.Include(x => x.OrderProducts).FirstOrDefault(x => x.Id == orderAcceptance.Id);
                if (order != null)
                {
                    if (!orderAcceptance.Accept)
                    {
                        var prod = order.OrderProducts.First();
                        var filterProduct = _context.FilterProducts.First(x =>
                        x.ProductId == prod.ProductId && x.FilterId == prod.FilterId);

                        filterProduct.Count += 1;
                        _context.FilterProducts.Update(filterProduct);
                        _context.SaveChanges();
                    }

                    var prodOrders = _context.OrderProducts.Where(x => x.OrderId == order.Id);

                    foreach (var prodOrder in prodOrders)
                    {
                        _context.OrderProducts.Remove(prodOrder);
                    }

                    _context.SaveChanges();

                    _context.Orders.Remove(order);
                    _context.SaveChanges();
                }
                return Ok();
            });
        }
    }
}
