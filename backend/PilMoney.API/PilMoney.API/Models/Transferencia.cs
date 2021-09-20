namespace PilMoney.API.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Transferencia")]
    public partial class Transferencia
    {
        public int Id { get; set; }

        public int? Id_CuentaEnvia { get; set; }

        public int? Id_CuentaRecibe { get; set; }

        public DateTime Fecha_Hora { get; set; }

        public double Monto { get; set; }

        public virtual Cuenta Cuenta { get; set; }

        public virtual Cuenta Cuenta1 { get; set; }
    }
}
