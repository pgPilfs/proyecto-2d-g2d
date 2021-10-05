namespace PilMoney.API.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class cuentas
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public cuentas()
        {
            movimientos = new HashSet<movimientos>();
            transferencias = new HashSet<transferencias>();
            transferencias1 = new HashSet<transferencias>();
            usuarios = new HashSet<usuarios>();
        }

        public int id { get; set; }

        public double saldo { get; set; }

        [Required]
        [StringLength(50)]
        public string cvu { get; set; }

        public DateTime fecha_alta { get; set; }

        [Required]
        [StringLength(50)]
        public string estado { get; set; }

        public int? id_tipo_cuenta { get; set; }

        public virtual tipo_cuenta tipo_cuenta { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<movimientos> movimientos { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<transferencias> transferencias { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<transferencias> transferencias1 { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<usuarios> usuarios { get; set; }
    }
}
