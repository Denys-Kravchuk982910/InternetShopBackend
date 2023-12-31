﻿using AutoMapper;
using InternetShopBackend.Data;
using InternetShopBackend.Data.Entities;
using InternetShopBackend.Modals;
using Microsoft.AspNetCore.Authorization;
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
        [Authorize]
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
        
        [HttpPost]
        [Route("delete")]
        [Authorize]
        public async Task<IActionResult> DeleteFilter([FromBody] DeleteFilter deleteFilter)
        {
            return await Task.Run(() =>
            {
                var item = _context.Filters.FirstOrDefault(x => x.Id == deleteFilter.Id);
                if (item != null)
                {
                    var filters = _context.Filters.Where(x => x.ParentId == deleteFilter.Id);
                    foreach (var filter in filters)
                    {
                        _context.Filters.Remove(filter);
                    }
                    _context.SaveChanges();


                    _context.Filters.Remove(_context.Filters.First(x => x.Id == deleteFilter.Id));
                    _context.SaveChanges();
                }
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
                .OrderBy(x => x.Id)
                .Select(x => new
                {
                    Id = x.Id,
                    Title = x.Title,
                    Children = x.Children.Select(y => new { Title = y.Title, Id = y.Id })
                });
                return Ok(result);
            });
        }

        [HttpGet]
        [Route("getallfilters")]
        public async Task<IActionResult> GetAllFilters()
        {
            return await Task.Run(() =>
            {
                var filters = _context.Filters.Where(x => x.ParentId > 1).Select(x => new {
                    Id = x.Id,
                    Title = x.Title
                }).ToList();
                return Ok(filters);
            });
        }

        [HttpGet]
        [Route("getgroupedfilters")]
        public async Task<IActionResult> GetAllFiltersByGroups()
        {
            return await Task.Run(() =>
            {
                var filters = _context.Filters.GroupBy(x => x.ParentId).Where(x => x.Key > 1)
                .Select(x => new
                {
                    Key = x.Key,
                    Name = _context.Filters.First(a => a.Id == x.Key).Title,
                    Items = x.Select(y => new
                    {
                        Id = y.Id,
                        Title = y.Title,
                    }).ToList()
                });
                return Ok(filters);
            });
        }

        [HttpGet]
        [Route("getfiltermenu")]
        public async Task<IActionResult> GetFiltersMenu()
        {
            return await Task.Run(() =>
            {
                var filters = _context.Filters.Where(x => x.ParentId <= 1 || x.Id == 1)
                .Select(x => new
                {
                    Id = x.Id,
                    Title = x.Title
                });

                return Ok(filters);
            });
        }
    }
}
