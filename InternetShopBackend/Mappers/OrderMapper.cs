using AutoMapper;
using InternetShopBackend.Data.Entities;
using InternetShopBackend.Modals;

namespace InternetShopBackend.Mappers
{
    public class OrderMapper : Profile
    {
        public OrderMapper()
        {
            CreateMap<PushOrder, AppOrder>()
                .ForMember(x => x.Email, y => y.MapFrom(q => q.Email))
                .ForMember(x => x.Surname, y => y.MapFrom(q => q.Surname))
                .ForMember(x => x.Name, y => y.MapFrom(q => q.Name))
                .ForMember(x => x.PhoneNumber, y => y.MapFrom(q => q.PhoneNumber))
                .ForMember(x => x.ParentName, y => y.MapFrom(q => q.ParentName))
                .ForMember(x => x.Post, y => y.MapFrom(q => q.Post));
        }
    }
}
