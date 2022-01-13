using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ReStoreDataAccessLibrary.Entities;
using ReStoreDataAccessLibrary.Entities.OrderAggregate;
using ReStoreModelLibrary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReStoreDataAccessLibrary
{
    public class StoreDbContext : IdentityDbContext<User, Role, int>
    {
        public StoreDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Basket> Baskets { get; set; }
        // No need to add other orderaggregate entities since they will
        // always come with an order.
        public DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>()
                .HasOne(u => u.Address)
                .WithOne()
                .HasForeignKey<UserAddress>(a => a.Id)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Role>()
                .HasData(
                new Role {Id=1, Name = "Member", NormalizedName = "MEMBER" },
                new Role {Id=2, Name = "Admin", NormalizedName = "ADMIN" }
                );
        }
    }
}