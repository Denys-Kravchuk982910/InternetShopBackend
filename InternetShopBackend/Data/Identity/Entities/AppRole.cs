using Microsoft.AspNetCore.Identity;

namespace InternetShopBackend.Data.Identity.Entities
{
    public class AppRole : IdentityRole<long>
    {
        public virtual ICollection<AppUserRole> UserRoles { get; set; }
    }
}
