using InternetShopBackend.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InternetShopBackend.Data.Configuration
{
    public class StoryConfiguration : IEntityTypeConfiguration<AppStory>
    {
        public void Configure(EntityTypeBuilder<AppStory> builder)
        {
            builder.ToTable("tblStories");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Image)
                .HasMaxLength(255).IsRequired();

            builder.Property(x => x.Title)
                .HasMaxLength(255).IsRequired();
        }
    }
}
