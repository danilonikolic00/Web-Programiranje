using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Projekat.Models
{
    [Table("Katalog")]
    public class Katalog
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }
        
        [Column("Naziv")]
        [MaxLength(255)]
        public string Naziv { get; set; }
        
        [Column("N")]
        public int N { get; set; }
        
        [Column("M")]
        public int M { get; set; }
        
        public virtual List<VideoIgra> VideoIgre { get; set; }
    }
}