using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.DbOperations
{
    public class Il
    {
        [Key]
        public int Id { get; set; }
        public string IlAd { get; set; }
    }
}