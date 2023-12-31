﻿using InternetShopBackend.Data.Configuration;
using InternetShopBackend.Data.Entities;
using InternetShopBackend.Data.Identity.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace InternetShopBackend.Data
{
    public class EFContext : IdentityDbContext<AppUser, AppRole, long, IdentityUserClaim<long>, AppUserRole,
        IdentityUserLogin<long>, IdentityRoleClaim<long>, IdentityUserToken<long>>
    {
        public DbSet<AppProduct> Products { get; set; }
        public DbSet<AppStory> Stories { get; set; }
        public DbSet<AppFeedback> Feedbacks { get; set; }
        public DbSet<AppFilter> Filters { get; set; }
        public DbSet<AppPost> Posts { get; set; }
        public DbSet<AppProductImage> ProductImages { get; set; }
        public DbSet<AppFilterProduct> FilterProducts { get; set; }
        public DbSet<AppOrder> Orders { get; set; }
        public DbSet<AppOrderProduct> OrderProducts { get; set; }
        public DbSet<AppUser> Users { get; set; }
        public DbSet<AppRole> Roles { get; set; }
        public DbSet<AppUserRole> UserRoles { get; set; }
        public EFContext(DbContextOptions opts) : base(opts)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new ProductConfiguration());
            modelBuilder.ApplyConfiguration(new FilterConfiguration());
            modelBuilder.ApplyConfiguration(new FeedbackConfiguration());
            modelBuilder.ApplyConfiguration(new PostConfiguration());
            modelBuilder.ApplyConfiguration(new StoryConfiguration());
            modelBuilder.ApplyConfiguration(new ProductImageConfiguration());
            modelBuilder.ApplyConfiguration(new FilterProductConfiguration());
            modelBuilder.ApplyConfiguration(new OrderConfiguration());
            modelBuilder.ApplyConfiguration(new ProductOrderConfiguration());
        }
    }
}
