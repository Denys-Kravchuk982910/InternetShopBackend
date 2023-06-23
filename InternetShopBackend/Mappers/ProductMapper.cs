using AutoMapper;
using InternetShopBackend.Data.Entities;
using InternetShopBackend.Modals;

namespace InternetShopBackend.Mappers
{
    public class ProductMapper : Profile
    {
        public ProductMapper()
        {
            CreateMap<AddProduct, AppProduct>()
                .ForMember(x => x.Title, y => y.MapFrom(a => a.Title))
                .ForMember(x => x.Price, y => y.MapFrom(a => a.Price))
                .ForMember(x => x.Count, y => y.MapFrom(a => a.Count))
                .ForMember(x => x.Description, y => y.MapFrom(a => a.Description))
                .ForMember(x => x.Id, y => y.Ignore());

            CreateMap<EditProduct, AppProduct>()
                .ForMember(x => x.Title, y => y.MapFrom(a => a.Title))
                .ForMember(x => x.Price, y => y.MapFrom(a => a.Price))
                .ForMember(x => x.Count, y => y.MapFrom(a => a.Count))
                .ForMember(x => x.Description, y => y.MapFrom(a => a.Description))
                .ForMember(x => x.Id, y => y.MapFrom(a => a.Id));

            CreateMap<ProductModal, AppProduct>()
                .ForMember(x => x.Title, y => y.MapFrom(a => a.Title))
                .ForMember(x => x.Price, y => y.MapFrom(a => a.Price))
                .ForMember(x => x.Count, y => y.MapFrom(a => a.Count))
                .ForMember(x => x.Description, y => y.MapFrom(a => a.Description))
                .ForMember(x => x.Id, y => y.MapFrom(a => a.Id));

         
        }
    }
}
