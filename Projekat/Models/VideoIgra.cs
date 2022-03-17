using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Projekat.Models
{
    public class VideoIgra
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Naziv")]
        [MaxLength(255)]
        public string Naziv { get; set; }
        
        [Column("Datum")]
        [DataType(DataType.Date)]
        public DateTime DatumIzdavanja { get; set; }
        
        [Column("BrojDiskova")]
        public int BrojDiskova { get; set; }

        [Column("Tip")]
        [MaxLength(255)]
        public string Tip { get; set; }

        [Column("NaStanju")]
        public int KolicinaNaStanju { get; set; }

        [Column("X")]
        public int X { get; set; }

        [Column("Y")]
        public int Y { get; set; }  

       //[ForeignKey]
        [Column("StudioID")]
        public int StudioID { get; set; }

        [JsonIgnore]
        public Katalog Katalog { get; set; }
    }
}