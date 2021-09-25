using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace WebApi.Models
{
    public class Kullanici
    {
        [Key]
        public int Id { get; set; }
        public string KullaniciAdi { get; set; }
        public string KullaniciSoyadi { get; set; }
        public string Sifre { get; set; }
        public string EMail { get; set; }
        public string Adres { get; set; }
        public bool Rol { get; set; }
        public bool isActive { get; set; }
    }
}