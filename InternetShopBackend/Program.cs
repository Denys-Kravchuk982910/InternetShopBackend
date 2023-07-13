using FluentValidation;
using FluentValidation.AspNetCore;
using InternetShopBackend.Data;
using InternetShopBackend.Data.Identity.Entities;
using InternetShopBackend.Mappers;
using InternetShopBackend.Modals;
using InternetShopBackend.Services;
using InternetShopBackend.Validators;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using Swashbuckle.AspNetCore.SwaggerUI;
using System.Text;

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

    opts.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter 'Bearer {token}' to authenticate.",
    });

    opts.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
                },
                new List<string>()
            }
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
builder.Services.AddScoped<IValidator<PushOrder>, OrderValidator>();
builder.Services.AddScoped<IJwtBearer, JwtBearer>();
#endregion


builder.Services.AddAutoMapper(typeof(ProductMapper));
builder.Services.AddAutoMapper(typeof(OrderMapper));


builder.Services.AddDbContext<EFContext>(opts =>
{
    opts.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));

})
    .AddIdentity<AppUser, AppRole>((IdentityOptions opts) =>
    {
        opts.Password.RequireLowercase = false;
        opts.Password.RequireUppercase = false;
        opts.Password.RequireDigit = false;
        opts.Password.RequiredLength = 5;
        opts.Password.RequireNonAlphanumeric = false;
    }).AddEntityFrameworkStores<EFContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication((AuthenticationOptions opts) =>
{
    opts.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opts.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer((JwtBearerOptions opts) =>
{
    opts.SaveToken = true;
    opts.RequireHttpsMetadata = false;
    opts.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateLifetime = false,
        ValidateIssuer = false,

        ValidateIssuerSigningKey = true,
        ValidateAudience = false,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                builder.Configuration.GetValue<string>("private_key")))
    };
});


var app = builder.Build();


app.UseCors((CorsPolicyBuilder builder) => {
    builder
    .AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod();
});

// Configure the HTTP request pipeline.


app.UseAuthentication();
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
