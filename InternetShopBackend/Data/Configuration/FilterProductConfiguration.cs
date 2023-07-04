using InternetShopBackend.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InternetShopBackend.Data.Configuration
{
    public class FilterProductConfiguration : IEntityTypeConfiguration<AppFilterProduct>
    {
        public void Configure(EntityTypeBuilder<AppFilterProduct> builder)
        {
            builder.HasKey(x => new { x.ProductId, x.FilterId });

            builder.Property(x => x.Count)
                .IsRequired();

            builder.HasOne(x => x.Product)
                .WithMany(x => x.FilterProducts)
                .HasForeignKey(x => x.ProductId)
                .IsRequired();

            builder.HasOne(x => x.Filter)
                .WithMany(x => x.FilterProducts)
                .HasForeignKey(x => x.FilterId)
                .IsRequired();
        }
    }
}
