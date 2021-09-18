namespace PilMoney.API
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Usuario")]
    public partial class Usuario
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string NombreCompleto { get; set; }

        [Required]
        [StringLength(8)]
        public string DNI { get; set; }

        [Required]
        [StringLength(1)]
        public string Sexo { get; set; }

        public DateTime Fecha_Nac { get; set; }

        [Required]
        [StringLength(50)]
        public string Email { get; set; }

        [Required]
        [StringLength(16)]
        public string Contraseña { get; set; }

        public int? Id_Cuenta { get; set; }

        public virtual Cuenta Cuenta { get; set; }
    }
}
