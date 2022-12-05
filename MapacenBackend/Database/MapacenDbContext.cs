using Microsoft.EntityFrameworkCore;

namespace MapacenBackend.Entities;

public class MapacenDbContext : DbContext
{
    public MapacenDbContext(DbContextOptions<MapacenDbContext> options) : base(options)
    {
        //Database.EnsureDeleted();
        //Database.EnsureCreated();
    }

    public DbSet<Address> Addresses { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<County> Counties { get; set; }
    public DbSet<Offer> Offers { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<SalesPoint> SalesPoints { get; set; }
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        //modelBuilder.Entity<Address>().
        //    .HasIndex(a => new { a.Street, a.City, a.PostalCode, a.Number })
        //    .IsUnique();

        modelBuilder.Entity<User>()
            .HasIndex(x => x.Email)
            .IsUnique();

        //modelBuilder.Entity<User>()
        //    .AllProperties()
        //    .ForEach(x => x.IsRequired());

        //modelBuilder.Entity<Role>()
        //    .AllProperties()
        //    .ForEach(x => x.IsRequired());

        //modelBuilder.Entity<Category>()
        //    .Property(x => x.Products)
        //    .IsRequired();

        //modelBuilder.Entity<Comment>()
        //    .AllProperties()
        //    .ForEach(x => x.IsRequired());

        //modelBuilder.Entity<Comment>()
        //    .Property(c => c.Content)
        //    .HasMaxLength(250);

        //modelBuilder.Entity<County>()
        //    .AllProperties()
        //    .ForEach(x => x.IsRequired());

        //modelBuilder.Entity<Offer>()
        //    .AllProperties()
        //    .ForEach(x => x.IsRequired());

        //modelBuilder.Entity<Product>()
        //    .AllProperties()
        //    .ForEach(x => x.IsRequired());

        //modelBuilder.Entity<SalesPoint>()
        //    .AllProperties()
        //    .ForEach(x => x.IsRequired());
    }
}