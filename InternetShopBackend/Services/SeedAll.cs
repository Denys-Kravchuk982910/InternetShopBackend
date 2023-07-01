using InternetShopBackend.Data;
using InternetShopBackend.Data.Entities;

namespace InternetShopBackend.Services
{
    public static class SeedAll
    {
        public static void SeedFilter(this IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<EFContext>();


                AppFilter main = new AppFilter
                {
                    Title = "Filter",
                    ParentId = null
                };


                context.Filters.Add(main);
                context.SaveChanges();


                context.Filters.Add(new AppFilter{
                    Title = "Стать", Parent = main
                });
                context.Filters.Add(new AppFilter
                {
                    Title = "Бренд",
                    Parent = main
                });
                context.Filters.Add(new AppFilter
                {
                    Title = "Розмір",
                    Parent = main
                });
                context.Filters.Add(new AppFilter
                {
                    Title = "Колір",
                    Parent = main
                });
                context.Filters.Add(new AppFilter
                {
                    Title = "Ціна",
                    Parent = main
                });

                context.SaveChanges();

                context.Filters.Add(new AppFilter
                {
                    Title = "Чоловіча",
                    ParentId = 2
                });

                context.Filters.Add(new AppFilter
                {
                    Title = "Жіноча",
                    ParentId = 2
                });
                context.SaveChanges();



                context.Filters.Add(new AppFilter
                {
                    Title = "Puma",
                    ParentId = 3
                });

                context.Filters.Add(new AppFilter
                {
                    Title = "Adidas",
                    ParentId = 3
                });

                context.Filters.Add(new AppFilter
                {
                    Title = "Nike",
                    ParentId = 3
                });
                context.SaveChanges();


                context.Filters.Add(new AppFilter
                {
                    Title = "Чорний",
                    ParentId = 5
                });

                context.SaveChanges();

            }

        }
    }
}
