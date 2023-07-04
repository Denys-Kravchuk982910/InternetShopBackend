using InternetShopBackend.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InternetShopBackend.Data.Configuration
{
    public class ProductOrderConfiguration : IEntityTypeConfiguration<AppOrderProduct>
    {
        public void Configure(EntityTypeBuilder<AppOrderProduct> builder)
        {
            builder.ToTable("tblOrderProducts");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Size)
                .IsRequired();

            builder.HasOne(x => x.Product)
                .WithMany(x => x.OrderProducts)
                .HasForeignKey(x => x.ProductId)
                .IsRequired();

            builder.HasOne(x => x.Order)
                .WithMany(x => x.OrderProducts)
                .HasForeignKey(x => x.OrderId)
                .IsRequired();


        }
    }
}
