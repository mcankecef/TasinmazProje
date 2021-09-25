using System;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Models
{
    public class Log
    {
        [Key]
        public int LogId { get; set; }
        public bool Durum { get; set; }
        public string IslemTip { get; set; }
        public string Aciklama { get; set; }
        public DateTime TarihSaat { get; set; }
        public string Ip { get; set; }
    }
    
}