using InternetShopBackend.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InternetShopBackend.Data.Configuration
{
    public class FilterConfiguration : IEntityTypeConfiguration<AppFilter>
    {
        public void Configure(EntityTypeBuilder<AppFilter> builder)
        {
            builder.ToTable("tblFilters");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Title).IsRequired().HasMaxLength(255);

            builder.HasOne(x => x.Parent)
                .WithMany(y => y.Children)
                .HasForeignKey(x => x.ParentId);
        }
    }
}
