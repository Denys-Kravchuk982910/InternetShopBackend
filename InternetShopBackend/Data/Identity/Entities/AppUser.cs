using Microsoft.AspNetCore.Identity;

namespace InternetShopBackend.Data.Identity.Entities
{
    public class AppUser : IdentityUser<long>
    {
        public virtual ICollection<AppUserRole> UserRoles { get; set; }
    }
}
