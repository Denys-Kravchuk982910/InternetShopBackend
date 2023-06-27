using AutoMapper;
using InternetShopBackend.Data;
using InternetShopBackend.Data.Entities;
using InternetShopBackend.Modals;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InternetShopBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilterController : ControllerBase
    {
        private EFContext _context { get; set; }
        private IMapper _mapper { get; set; }
        public FilterController(EFContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddFilter([FromBody] AddFilter addFilter)
        {
            return await Task.Run(() =>
            {
                AppFilter appFilter = _mapper.Map<AppFilter>(addFilter);
                _context.Filters.Add(appFilter);
                _context.SaveChanges();
                return Ok(new
                {
                    Id = appFilter.Id,
                    Message = "Added successfully!"
                });
            });
        }
        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> DeleteFilter([FromBody] DeleteFilter deleteFilter)
        {
            return await Task.Run(() =>
            {
                _context.Filters.Remove(_context.Filters.First(x => x.Id == deleteFilter.Id));
                _context.SaveChanges();
                return Ok(new
                {
                    Message = "Deleted successfully"
                });
            });
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> GetFilters([FromQuery] int getFilter)
        {
            return await Task.Run(() =>
            {
                var result = _context.Filters.Include(x => x.Children)
                .Where(x => x.ParentId == getFilter)
                .Select(x => new
                {
                    Id = x.Id,
                    Title = x.Title,
                    Children = x.Children.Select(y => new { Title = y.Title, Id = y.Id })
                });
                return Ok(result);
            });
        }
    }
}
