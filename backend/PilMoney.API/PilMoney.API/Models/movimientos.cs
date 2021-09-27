namespace PilMoney.API.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class movimientos
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int id { get; set; }

        public DateTime fecha_hora { get; set; }

        public double monto { get; set; }

        [Required]
        [StringLength(50)]
        public string tipo_movimiento { get; set; }

        public int? id_cuenta { get; set; }

        public virtual cuentas cuentas { get; set; }
    }
}
