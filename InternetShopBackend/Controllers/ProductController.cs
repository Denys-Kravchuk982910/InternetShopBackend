using AutoMapper;
using InternetShopBackend.Data;
using InternetShopBackend.Data.Entities;
using InternetShopBackend.Modals;
using InternetShopBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Drawing;
using System.Drawing.Imaging;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Runtime.CompilerServices;

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
        [Authorize]
        public async Task<IActionResult> AddProduct([FromBody] AddProduct addProduct)
        {
            return await Task.Run(() =>
            {
                IActionResult res = null;
                try
                {
                    AppProduct product = this._mapper.Map<AppProduct>(addProduct);
                    product.Rating = 0;
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
        [Authorize]
        public async Task<IActionResult> AddProductImage([FromBody] ProductImage productImage)
        {
            return await Task.Run(() =>
            {
                IActionResult res = null;

                try
                {
                    string name = Path.GetRandomFileName() + ".jpg";
                    string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Images", name);

                    //Bitmap bmp = ImageWorker.ConvertToImage(productImage.ImageBase64);

                    //bmp.Save(filePath);

                    byte[] imageBytes = Convert.FromBase64String(productImage.ImageBase64);

                    // Save the image file to the specified path
                    System.IO.File.WriteAllBytes(filePath, imageBytes);

                    var prodImage = new AppProductImage
                    {
                        Image = name,
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
        [Authorize]
        public async Task<IActionResult> DeleteProductImage([FromBody] DelProductImage productImage)
        {
            return await Task.Run(() =>
            {
                IActionResult res = null;
                try
                {
                    var item = _context.ProductImages
                        .FirstOrDefault(x => x.Id == productImage.Id);
                    string path = Path.Combine(Directory.GetCurrentDirectory(), "Images", item.Image);
                        if (System.IO.File.Exists(path))
                        {
                            System.IO.File.Delete(path);
                        }
                        _context.ProductImages.Remove(item);
                        _context.SaveChanges();
                        res = Ok(new
                        {
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
        [Route("alldelimages")]
        [Authorize]
        public async Task<IActionResult> DeleteAllProductImages([FromBody] DelProductImages productImages)
        {
            return await Task.Run(() =>
            {
                IActionResult res = null;
                try
                {
                    var items = _context.ProductImages
                        .Where(x => x.ProductId == productImages.Id).ToList();
                    foreach (var item in items)
                    {
                        string path = Path.Combine(Directory.GetCurrentDirectory(), "Images", item.Image);
                        if (System.IO.File.Exists(path))
                        {
                            System.IO.File.Delete(path);
                        }
                        _context.ProductImages.Remove(item);
                        _context.SaveChanges();
                    }

                    res = Ok(new
                    {
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
        [Route("alldelfilters")]
        [Authorize]
        public async Task<IActionResult> DeleteAllFilters([FromBody] DelProductImages productImages)
        {
            return await Task.Run(() =>
            {
                IActionResult res = null;
                try
                {
                    var items = _context.FilterProducts
                        .Where(x => x.ProductId == productImages.Id).ToList();
                    foreach (var item in items)
                    {
                        _context.FilterProducts.Remove(item);
                        _context.SaveChanges();
                    }

                    res = Ok(new
                    {
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
        [Authorize]
        public async Task<IActionResult> CombineWithFilter([FromBody] ProductFilter productFilter)
        {
            return await Task.Run(() =>
            {
                IActionResult res = null!;
                try
                {
                    var item = _context.FilterProducts.FirstOrDefault(x => x.ProductId == productFilter.ProductId
                    && x.FilterId == productFilter.FilterId);
                    if (item == null)
                    {
                        if (_context.Filters.Any(x => x.Id == productFilter.FilterId))
                        {
                            AppFilterProduct appFilterProduct = new AppFilterProduct
                            {
                                FilterId = productFilter.FilterId,
                                ProductId = productFilter.ProductId,
                                Count = 1
                            };

                            _context.FilterProducts.Add(appFilterProduct);
                        }
                    }
                    else
                    {
                        item.Count++;
                    }
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

        [HttpPost]
        [Route("edit")]
        [Authorize]
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
                        if(editProduct.Price != -1) 
                            dbProduct.Price = editProduct.Price;

                        if(editProduct.Description != "__empty__")
                            dbProduct.Description = editProduct.Description;
                        
                        if (editProduct.Title != "__empty__")
                            dbProduct.Title = editProduct.Title;

                        if (editProduct.Brand != "__empty__")
                            dbProduct.Brand = editProduct.Brand;

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

        [HttpPost]
        [Route("delete")]
        [Authorize]
        public async Task<IActionResult> DeleteProduct([FromBody] DeleteProduct deleteProduct)
        {
            return await Task.Run(() =>
            {
                IActionResult res = null;
                try
                {
                    var product = _context.Products.FirstOrDefault(x => x.Id == deleteProduct.Id);
                    if(product != null)
                    {
                        _context.Products.Remove(product);
                        _context.SaveChanges();
                    }
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

        public async Task<IActionResult> GetProducts([FromQuery] int skipped)
        {
            return await Task.Run(() =>
            {
                IActionResult res = null;
                try
                {
                    var products = _context.Products.Include(x => x.ProductImages)
                    .Include(x => x.FilterProducts).ThenInclude(x => x.Filter)
                    .Where(x => x.FilterProducts.Where(y => y.Filter.ParentId == 4 && y.Count > 0).Any()).Select(x => new
                    {
                        Id = x.Id,
                        Title = x.Title,
                        Price = x.Price,
                        Description = x.Description,
                        Count = x.Count,
                        Rating = x.Rating,
                        Brand = x.Brand,
                        Images = x.ProductImages.Select(y => new
                        {
                            Image = y.Image,
                            Id = y.Id,
                            ProductId = y.ProductId
                        }).ToList()
                    })
                    .OrderByDescending(x => x.Id)
                    .Skip(12 * skipped).Take(12).ToList();
                    

                    res = Ok(products);
                }
                catch (Exception ex)
                {
                    res = BadRequest(ex);
                }
                
                
                return res;
            });
        }

        [HttpGet]
        [Route("getbyid")]
        public async Task<IActionResult> GetProduct([FromQuery] int id)
        {
            return await Task.Run(() =>
            {
                return Ok(_context.Products.Include(x => x.ProductImages).Select(x => new
                {
                    Id = x.Id,
                    Title = x.Title,
                    Price = x.Price,
                    Description = x.Description,
                    Count = x.Count,
                    Rating = x.Rating,
                    Brand = x.Brand,
                    Images = x.ProductImages.Select(y => new
                    {
                        Image = y.Image,
                        Id = y.Id,
                        ProductId = y.ProductId
                    }).ToList()
                }).First(x => x.Id == id));
            });
        }

        [HttpPost]
        [Route("getbyfilter")]
        public async Task<IActionResult> GetProductsByFilter([FromBody] GetByFilter filters)
        {
            return await Task.Run(() =>
            {
                IActionResult res = null;
                try
                {
                    if (filters.keys.Length > 0)
                    {
                        var query = _context.Filters.Include(x => x.FilterProducts)
                            .Where(x => filters.keys.Contains(x.Id))
                            .GroupBy(x => x.ParentId).ToList();
                        //.SelectMany(x => x.FilterProducts.Select(y => y.ProductId))
                        //.Select(x => _context.Products.Include(q => q.ProductImages)
                        //    .FirstOrDefault(y => y.Id == x))
                        //    .ToList();

                        bool flag = false;
                        
                        IQueryable<AppProduct> productsQuery = _context.Products.Include(x => x.FilterProducts)
                        .ThenInclude(x => x.Filter)
                        .Where(x => x.FilterProducts.Where(y => y.Filter.ParentId == 4 && y.Count > 0).Any())
                                    .Include(x => x.ProductImages)
                                    .Select(x => x).AsQueryable();
                        foreach (var group in query)
                        {
                            List<IQueryable<AppProduct>> productItems = new List<IQueryable<AppProduct>>();
                            foreach (var it in group)
                            {
                                var testItem = productsQuery.Include(x => x.FilterProducts)
                                    .Include(x => x.ProductImages)
                                .Where(x => x.FilterProducts
                                .FirstOrDefault(y => y.FilterId == it.Id && y.Count > 0) != null);
                                
                                if (testItem.Count() > 0)
                                {
                                    productItems.Add(testItem);
                                }
                            }

                            productsQuery = productItems.SelectMany(x => x).Select(x => x).AsQueryable();

                        }


                        var productArray = productsQuery
                        .Select(x => x).ToList();


                        var filtered = productArray
                        .Select(x => new
                        {
                            Id = x.Id,
                            Title = x.Title,
                            Price = x.Price,
                            Description = x.Description,
                            Count = x.Count,
                            Rating = x.Rating,
                            Brand = x.Brand,
                            Images = x.ProductImages.Select(y => new
                            {
                                Image = y.Image,
                                Id = y.Id,
                                ProductId = y.ProductId
                            }).ToList()
                        })
                        .DistinctBy(x => x.Id)
                        .OrderByDescending(x => x.Id)
                        .Skip(12 * filters.skipped).Take(12).ToList();

                        return Ok(filtered);
                    }
                    var products = _context.Products.Include(x => x.ProductImages)
                    .Include(x => x.FilterProducts).ThenInclude(x => x.Filter)
                    .Where(x => x.FilterProducts.Where(y => y.Filter.ParentId == 4 && y.Count > 0).Any())
                    .Select(x => new
                    {
                        Id = x.Id,
                        Title = x.Title,
                        Price = x.Price,
                        Description = x.Description,
                        Count = x.Count,
                        Rating = x.Rating,
                        Brand = x.Brand,
                        Images = x.ProductImages.Select(y => new
                        {
                            Image = y.Image,
                            Id = y.Id,
                            ProductId = y.ProductId
                        }).ToList()
                    })
                    .OrderByDescending(x => x.Id)
                    .Skip(12 * filters.skipped).Take(12).ToList();


                    res = Ok(products);
                }
                catch (Exception ex)
                {
                    res = BadRequest(ex);
                }


                return res;
            });
        }

        [HttpGet]
        [Route("count")]
        public async Task<IActionResult> GetCount()
        {
            return await Task.Run(() =>
            {
                return Ok(_context.Products.Count());
            });
        }

        [HttpPost]
        [Route("countbyfilter")]
        public async Task<IActionResult> GetCountByFilter([FromBody] GetByFilter filters)
        {
            return await Task.Run(() =>
            {
                if (filters.keys.Length > 0)
                {
                    var query = _context.Filters.Include(x => x.FilterProducts)
                    .Where(x => filters.keys.Contains(x.Id))
                    .SelectMany(x => x.FilterProducts.Select(y => y.ProductId))
                    .Select(x => _context.Products.Include(q => q.ProductImages)
                    .First(y => y.Id == x)).ToList();

                    return Ok(query.Count);
                }
                return Ok(_context.Products.Count());
            });
        }

        [HttpGet]
        [Route("gettop")]
        public async Task<IActionResult> GetTopProducts()
        {
            return await Task.Run(() =>
            {
                return Ok(_context.Products
                    .Include(x => x.FilterProducts).ThenInclude(x => x.Filter)
                    .Where(x => x.FilterProducts.Where(y => y.Filter.ParentId == 4 && y.Count > 0).Any())
                    .Select(x => x).Include(x => x.ProductImages).OrderByDescending(x => x.Id)
                    .Take(5).ToList()
                    .Select(x => new
                    {
                        Id = x.Id,
                        Title = x.Title,
                        Price = x.Price,
                        Description = x.Description,
                        Count = x.Count,
                        Rating = x.Rating,
                        Brand = x.Brand,
                        Images = x.ProductImages.Select(y => new
                        {
                            Image = y.Image,
                            Id = y.Id,
                            ProductId = y.ProductId
                        }).ToList()
                    }));
            });
        }

        [HttpGet]
        [Route("getsize")]
        public async Task<IActionResult> GetSize([FromQuery] int id)
        {

            return await Task.Run(() =>
            {
                IActionResult res = BadRequest();

                var filters = _context.Products.Include(x => x.FilterProducts)
                .ThenInclude(x => x.Filter).FirstOrDefault(x => x.Id == id)?
                .FilterProducts.Where(x => x.Filter.ParentId == 4 && x.Count > 0).Select(x => x.Filter);
                if (filters != null)
                {
                    var sizes = filters.Select(x => new
                    {
                        Id = x.Id,
                        Size = x.Title
                    });
                    res = Ok(sizes);
                }

                return res;
            });
        }
    }
}
