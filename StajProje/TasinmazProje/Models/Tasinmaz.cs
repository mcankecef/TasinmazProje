using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.DbOperations
{
    public class Tasinmaz
    {
        [Key]
        public int Id { get; set; }
        public int Ada { get; set; }
        public int Parsel { get; set; }
        public string Nitelik { get; set; }
        public bool isActive { get; set; }
        public string Adres { get; set; } 
        [ForeignKey("Mahalle")]
        public int MahalleId { get; set; }
        public virtual Mahalle Mahalleler { get; set; }   
    }
}