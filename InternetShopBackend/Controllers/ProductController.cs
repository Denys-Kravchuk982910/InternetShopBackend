using AutoMapper;
using InternetShopBackend.Data;
using InternetShopBackend.Data.Entities;
using InternetShopBackend.Modals;
using InternetShopBackend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Drawing;

namespace InternetShopBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private EFContext _context;
        private IMapper _mapper;

        public ProductController(EFContext context, IMapper mapper)
        {
            this._context = context;
            this._mapper = mapper;
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddProduct([FromBody] AddProduct addProduct)
        {
            return await Task.Run(() =>
            {
                IActionResult res = null;
                try
                {
                    AppProduct product = this._mapper.Map<AppProduct>(addProduct);

                    _context.Products.Add(product);
                    _context.SaveChanges();
                    res = Ok(new{
                        Message = "Added to database successfully",
                        Id = product.Id,
                    });
                }
                catch (Exception ex)
                {
                    res = BadRequest(ex);
                }

                return res;
            });
        }

        [HttpPost]
        [Route("addimage")]
        public async Task<IActionResult> AddProductImage([FromBody] ProductImage productImage)
        {
            return await Task.Run(() =>
            {
                IActionResult res = null;

                try
                {
                    string name = Path.GetRandomFileName() + ".jpg";
                    string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Images", name);

                    Bitmap bmp = ImageWorker.ConvertToImage(productImage.ImageBase64);
                    bmp.Save(filePath);

                    var prodImage = new AppProductImage
                    {
                        Image = filePath,
                        ProductId = productImage.ProductId
                    };

                    _context.ProductImages.Add(prodImage);
                    _context.SaveChanges();
                    res = Ok(new { 
                        Message = "Added Successfully!",
                        Id = prodImage.Id
                    });
                }
                catch (Exception ex)
                {
                    res = BadRequest(ex);
                }
                return res;
            });
        }

        [HttpPost]
        [Route("deleteimage")]
        public async Task<IActionResult> DeleteProductImage([FromBody] DelProductImage productImage)
        {
            return await Task.Run(() =>
            {
                IActionResult res = null;
                try
                {
                    var item = _context.ProductImages
                        .First(x => x.Id == productImage.Id);
                    string path = Path.Combine(Directory.GetCurrentDirectory(), "Images", item.Image);
                    if(System.IO.File.Exists(path))
                    {
                        System.IO.File.Delete(path);
                    }
                    _context.ProductImages.Remove(item);
                    _context.SaveChanges();
                    res = Ok(new {
                        Message = "Deleted successfully"
                    });
                }
                catch (Exception ex)
                {
                    res = BadRequest(ex);
                }

                return res;
            });
        }

        [HttpPost]
        [Route("tofilter")]
        public async Task<IActionResult> CombineWithFilter([FromBody] ProductFilter productFilter)
        {
            return await Task.Run(() =>
            {
                IActionResult res = null!;
                try
                {

                    AppFilterProduct appFilterProduct = new AppFilterProduct
                    {
                        FilterId = productFilter.FilterId,
                        ProductId = productFilter.ProductId
                    };

                    _context.FilterProducts.Add(appFilterProduct);
                    _context.SaveChanges();
                    res = Ok();
                }
                catch (Exception ex)
                {
                    res = BadRequest(ex);
                }
                return res;
            });
        }

        [HttpPut]
        [Route("edit")]
        public async Task<IActionResult> EditProduct([FromBody] EditProduct editProduct) 
        {
            return await Task.Run(() =>
            {
                IActionResult res = null;
                try
                {
                    AppProduct dbProduct = _context.Products.FirstOrDefault(x => x.Id == editProduct.Id)!;

                    if (dbProduct != null)
                    {

                        
                        dbProduct.Price = editProduct.Price;
                        dbProduct.Description = editProduct.Description;
                        dbProduct.Title = editProduct.Title;
                        dbProduct.Count = editProduct.Count;

                        _context.Update(dbProduct);

                        _context.SaveChanges();

                    }

                    res = Ok(new
                    {
                        Message = "Added to database successfully"
                    });
                }
                catch (Exception ex)
                {
                    res = BadRequest(ex);
                }

                return res;
            });
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> DeleteProduct([FromBody] DeleteProduct deleteProduct)
        {
            return await Task.Run(() =>
            {
                IActionResult res = null;
                try
                {
                    _context.Products.Remove(_context.Products.First(x => x.Id == deleteProduct.Id));
                    _context.SaveChanges();
                    res = Ok(new
                    {
                        Message = "Deleted Successfully"
                    });
                }
                catch(Exception ex)
                {
                    res = BadRequest(ex);
                }
                return res;
            });
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> GetProducts()
        {
            return await Task.Run(() =>
            {
                IActionResult res = null;
                try
                {
                    var products = _context.Products.Include(x => x.ProductImages).Select(x => new
                    {
                        Id = x.Id,
                        Title = x.Title,
                        Price = x.Price,
                        Description = x.Description,
                        Count = x.Count,
                        Images = x.ProductImages.Select(y => new
                        {
                            Image = y.Image,
                            Id = y.Id,
                            ProductId = y.ProductId
                        })
                    });

                    res = Ok(products);
                }
                catch (Exception ex)
                {
                    res = BadRequest(ex);
                }
                
                
                return res;
            });
        }
    }
}
