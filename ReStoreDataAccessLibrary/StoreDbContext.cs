using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ReStoreDataAccessLibrary.Entities;
using ReStoreModelLibrary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReStoreDataAccessLibrary
{
    public class StoreDbContext : IdentityDbContext<User>
    {
        public StoreDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }

        public DbSet<Basket> Baskets { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>()
                .HasData(
                new IdentityRole { Name = "Member", NormalizedName = "MEMBER" },
                new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" }
        );
        }
    }
}