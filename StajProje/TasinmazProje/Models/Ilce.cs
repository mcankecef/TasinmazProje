using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.DbOperations
{
    public class Ilce
    {
        [Key]
        public int Id { get; set; }
        public string IlceAdi { get; set; }
        [ForeignKey("Il")]
        public int IlId { get; set; }
        public virtual Il Iller { get; set; }
        
    }
}