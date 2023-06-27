using InternetShopBackend.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InternetShopBackend.Data.Configuration
{
    public class ProductConfiguration : IEntityTypeConfiguration<AppProduct>
    {
        public void Configure(EntityTypeBuilder<AppProduct> builder)
        {
            builder.ToTable("tblProducts");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Title)
                .HasMaxLength(255).IsRequired();

            builder.Property(x => x.Price)
                .IsRequired();

            builder.Property(x => x.Count)
                .IsRequired();

            builder.Property(x => x.Rating)
                .IsRequired();

            builder.Property(x => x.Brand)
                .IsRequired()
                .HasMaxLength(255);
        }
    }
}
