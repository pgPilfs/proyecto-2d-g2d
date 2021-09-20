namespace PilMoney.API
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Movimiento")]
    public partial class Movimiento
    {
        public int Id { get; set; }

        public int? Id_Cuenta { get; set; }

        public DateTime Fecha_Hora { get; set; }

        public double Monto { get; set; }

        [Required]
        [StringLength(50)]
        public string Tipo_Movimiento { get; set; }

        public virtual Cuenta Cuenta { get; set; }
    }
}
