using InternetShopBackend.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InternetShopBackend.Data.Configuration
{
    public class FeedbackConfiguration : IEntityTypeConfiguration<AppFeedback>
    {
        public void Configure(EntityTypeBuilder<AppFeedback> builder)
        {
            builder.ToTable("tblFeedbacks");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Name)
                .IsRequired().HasMaxLength(255);

            builder.Property(x => x.Image)
                .IsRequired().HasMaxLength(255);

            builder.Property(x => x.Time)
                .IsRequired();
        }
    }
}
