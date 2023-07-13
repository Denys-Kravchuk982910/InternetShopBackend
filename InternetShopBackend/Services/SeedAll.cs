using InternetShopBackend.Data;
using InternetShopBackend.Data.Entities;
using InternetShopBackend.Data.Identity.Entities;
using Microsoft.AspNetCore.Identity;

namespace InternetShopBackend.Services
{
    public static class SeedAll
    {
       
        public static void SeedFilter(this IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<EFContext>();


                RoleManager<AppRole> _roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<AppRole>>();
                UserManager<AppUser> _userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
                if (!context.Filters.Any())
                {

                    AppFilter main = new AppFilter
                    {
                        Title = "Filter",
                        ParentId = null
                    };


                    context.Filters.Add(main);
                    context.SaveChanges();


                    context.Filters.Add(new AppFilter
                    {
                        Title = "Стать",
                        Parent = main
                    });
                    context.Filters.Add(new AppFilter
                    {
                        Title = "Бренд",
                        Parent = main
                    });

                    var sizeFilter = new AppFilter
                    {
                        Title = "Розмір",
                        Parent = main
                    };
                    context.Filters.Add(sizeFilter);
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


                    for (int i = 36; i <= 48; i++)
                    {
                        context.Filters.Add(new AppFilter
                        {
                            Title = i.ToString(),
                            Parent = sizeFilter
                        });
                    }

                    context.SaveChanges();
                }

                if(!context.Users.Any())
                {
                    AppRole role = new AppRole
                    {
                        Name = "ADMIN"
                    };

                    var resRole = _roleManager.CreateAsync(role).Result;

                    AppUser user = new AppUser
                    {
                        UserName = "admin@gmail.com",
                        Email = "admin@gmail.com",
                    };

                    var resUser = _userManager.CreateAsync(user, "#RFFa3#@4foif").Result;

                    if(resRole.Succeeded && resUser.Succeeded)
                    {
                        var roleAdd = _userManager.AddToRoleAsync(user, "ADMIN").Result;
                    }

                }
            }

        }
    }
}
