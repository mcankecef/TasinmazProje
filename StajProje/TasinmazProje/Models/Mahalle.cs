using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.DbOperations
{
    public class Mahalle
    {
        [Key]
        public int Id { get; set; }
        public string MahalleAdi { get; set; }
        [ForeignKey("Ilce")]
        public int IlceId { get; set; }
        public virtual Ilce Ilceler { get; set; }
    }
}