using Microsoft.EntityFrameworkCore;

namespace Projekat.Models
{
    public class GameShopContext : DbContext
    {
        public DbSet<Katalog> Katalozi {get; set; }
        public DbSet<VideoIgra> VideoIgre {get; set;}
        public DbSet<Studio> Studios {get; set;}

        public GameShopContext(DbContextOptions options) : base(options)
        {
            
        }
    }
}