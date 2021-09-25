using System;
using Microsoft.EntityFrameworkCore;
using TasinmazProje.Models;
using WebApi.DbOperations;
using WebApi.Models;

namespace WebApi.Context
{
    public class TasinmazDbContext:DbContext
    {
        public TasinmazDbContext(DbContextOptions<TasinmazDbContext>options):base(options)
        {
            
        }
        public DbSet<Tasinmaz> Tasinmazlar { get; set; }
        public DbSet<Mahalle> Mahalleler { get; set; }
        public DbSet<Ilce> Ilceler { get; set; }
        public DbSet<Il> Iller { get; set; }
        public DbSet<Kullanici> Kullanicilar { get; set; }
        public DbSet<Log> Loglar { get; set; }
    }
}