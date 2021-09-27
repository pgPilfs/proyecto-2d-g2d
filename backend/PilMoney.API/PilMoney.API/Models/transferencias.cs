namespace PilMoney.API.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class transferencias
    {
        public int id { get; set; }

        public DateTime fecha_hora { get; set; }

        public double monto { get; set; }

        public int id_cuenta_envia { get; set; }

        public int? id_cuenta_recibe { get; set; }

        public virtual cuentas cuentas { get; set; }

        public virtual cuentas cuentas1 { get; set; }
    }
}
