using InternetShopBackend.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InternetShopBackend.Data.Configuration
{
    public class OrderConfiguration : IEntityTypeConfiguration<AppOrder>
    {
        public void Configure(EntityTypeBuilder<AppOrder> builder)
        {
            builder.ToTable("tblOrders");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(255);

            builder.Property(x => x.Surname)
                .IsRequired()
                .HasMaxLength(255);

            builder.Property(x => x.ParentName)
                .IsRequired()
                .HasMaxLength(255);

            builder.Property(x => x.PhoneNumber)
                .IsRequired()
                .HasMaxLength(255);

            builder.Property(x => x.Email)
                .IsRequired()
                .HasMaxLength(255);


            builder.Property(x => x.Post)
                .IsRequired()
                .HasMaxLength(255);

        }
    }
}
