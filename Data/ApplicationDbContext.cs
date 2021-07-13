using dawproiect.Models;
using dawproiect.Models.Entities;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dawproiect.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        public DbSet<dawproiect.Models.Movie> Movie { get; set; }
        public DbSet<dawproiect.Models.Review> Review { get; set; }
        public DbSet<dawproiect.Models.Actor> Actor { get; set; }
        public DbSet<dawproiect.Models.Soundtrack> Soundtrack { get; set; }

        public DbSet<Customer> Customers { get; set; }

        // public DbSet<dawproiect.Models.MoviesActors> MoviesActors { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Soundtrack>(entity =>
            {
                entity.HasOne(x => x.Movie)
                 .WithOne(x => x.Soundtrack)
                 .HasForeignKey<Soundtrack>(x => x.MovieId);
            });

            modelBuilder.Entity<Review>(entity =>
            {
                entity.HasOne(x => x.Movie)
                 .WithMany(x => x.Reviews)
                 .HasForeignKey(x => x.MovieId);
            });

            modelBuilder.Entity<MoviesActors>()
                .HasKey(cs => new { cs.ActorId, cs.MovieId });

           

            base.OnModelCreating(modelBuilder);
        }
    }
}
