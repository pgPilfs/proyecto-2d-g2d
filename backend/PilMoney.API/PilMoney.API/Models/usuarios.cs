namespace PilMoney.API.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class usuarios
    {
        public int id { get; set; }

        [Required]
        [StringLength(50)]
        public string nombre_completo { get; set; }

        [Required]
        [StringLength(50)]
        public string dni { get; set; }

        [Required]
        [StringLength(1)]
        public string sexo { get; set; }

        [Column(TypeName = "date")]
        public DateTime fecha_nac { get; set; }

        [Required]
        [StringLength(50)]
        public string email { get; set; }

        [Required]
        [StringLength(50)]
        public string password { get; set; }

        public int? id_cuenta { get; set; }

        public virtual cuentas cuentas { get; set; }
    }
}
