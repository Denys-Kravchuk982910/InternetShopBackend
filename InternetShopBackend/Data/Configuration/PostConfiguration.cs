using InternetShopBackend.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InternetShopBackend.Data.Configuration
{
    public class PostConfiguration : IEntityTypeConfiguration<AppPost>
    {
        public void Configure(EntityTypeBuilder<AppPost> builder)
        {
            builder.ToTable("tblPosts");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Image)
                .HasMaxLength(255).IsRequired();
        }
    }
}
