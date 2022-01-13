using Microsoft.AspNetCore.Identity;

namespace ReStoreDataAccessLibrary.Entities
{
    public class User : IdentityUser<int>
    {
        public UserAddress Address { get; set; }
    }
}
