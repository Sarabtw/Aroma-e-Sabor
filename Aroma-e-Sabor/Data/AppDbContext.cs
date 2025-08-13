using Microsoft.EntityFrameworkCore;
using Aroma_e_Sabor.Models;

namespace Aroma_e_Sabor.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<itensCarrinho> ItensCarrinho { get; set; }
    }
}
