using AutoMapper;
using InternetShopBackend.Data.Entities;
using InternetShopBackend.Modals;

namespace InternetShopBackend.Mappers
{
    public class FilterMapper : Profile
    {
        public FilterMapper()
        {
            CreateMap<AddFilter, AppFilter>()
                .ForMember(x => x.Title, y => y.MapFrom(q => q.Title))
                .ForMember(x => x.ParentId, y => y.MapFrom(q => q.ParentId == 0 ? null : q.ParentId));


        }
    }
}
