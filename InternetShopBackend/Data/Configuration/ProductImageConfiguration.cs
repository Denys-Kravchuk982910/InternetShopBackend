using InternetShopBackend.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InternetShopBackend.Data.Configuration
{
    public class ProductImageConfiguration : IEntityTypeConfiguration<AppProductImage>
    {
        public void Configure(EntityTypeBuilder<AppProductImage> builder)
        {
            builder.ToTable("tblProductImages");

            builder.HasKey(x => x.Id);

            builder.HasOne(x => x.Product)
                .WithMany(x => x.ProductImages)
                .HasForeignKey(x => x.ProductId)
                .IsRequired();

            builder.Property(x => x.Image)
                .IsRequired().HasMaxLength(255);
        }
    }
}
