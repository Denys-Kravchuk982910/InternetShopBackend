using FluentValidation;
using FluentValidation.AspNetCore;
using InternetShopBackend.Data;
using InternetShopBackend.Mappers;
using InternetShopBackend.Modals;
using InternetShopBackend.Services;
using InternetShopBackend.Validators;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using Swashbuckle.AspNetCore.SwaggerUI;

var builder = WebApplication.CreateBuilder(args);


builder.WebHost
   .UseKestrel(options =>
   {
       options.Limits.MaxRequestBodySize = long.MaxValue;
   });
// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddSwaggerGen((SwaggerGenOptions opts) =>
{
    opts.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Crosshop.rv",
        Description = "Shoes store",
        Version = "v1",
    });

});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});


#region Validators
builder.Services.AddFluentValidationAutoValidation();

builder.Services.AddScoped<IValidator<AddProduct>, AddProductValidator>();
builder.Services.AddScoped<IValidator<EditProduct>, EditProductValidator>();
builder.Services.AddScoped<IValidator<DeleteProduct>, DeleteProductValidator>();
builder.Services.AddScoped<IValidator<GetProduct>, GetProductValidator>();
builder.Services.AddScoped<IValidator<AddFeedback>, AddFeedbackValidator>();
builder.Services.AddScoped<IValidator<DeleteFeedback>, DeleteFeedbackValidator>();
builder.Services.AddScoped<IValidator<AddFilter>, AddFilterValidator>();
builder.Services.AddScoped<IValidator<DeleteFilter>, DeleteFilterValidator>();
builder.Services.AddScoped<IValidator<DeletePostModal>, DeletePostValidator>();
builder.Services.AddScoped<IValidator<AddPostModal>, AddPostValidator>();
builder.Services.AddScoped<IValidator<DeleteStoryModal>, DeleteStoryValidator>();
builder.Services.AddScoped<IValidator<AddStoryModal>, AddStoryValidator>();
#endregion


builder.Services.AddAutoMapper(typeof(ProductMapper));
builder.Services.AddAutoMapper(typeof(OrderMapper));


builder.Services.AddDbContext<EFContext>(opts =>
{
    opts.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));

});


var app = builder.Build();


app.UseCors((CorsPolicyBuilder builder) => {
    builder
    .AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod();
});

// Configure the HTTP request pipeline.


app.UseAuthorization();

app.UseSwagger();
app.UseSwaggerUI((SwaggerUIOptions opts) =>
{
    opts.SwaggerEndpoint("/swagger/v1/swagger.json", "Crosshop.rv v1");
});

app.MapControllers();

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Images")),
    RequestPath = "/images"
}) ;
app.SeedFilter();
app.Run();
