using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;

namespace PilMoney.API.Models
{
    public partial class Model1 : DbContext
    {
        public Model1()
            : base("name=test")
        {
        }

        public virtual DbSet<Cuenta> Cuenta { get; set; }
        public virtual DbSet<Movimiento> Movimiento { get; set; }
        public virtual DbSet<TipoCuenta> TipoCuenta { get; set; }
        public virtual DbSet<Transferencia> Transferencia { get; set; }
        public virtual DbSet<Usuario> Usuario { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cuenta>()
                .Property(e => e.CVU)
                .IsUnicode(false);

            modelBuilder.Entity<Cuenta>()
                .Property(e => e.Estado)
                .IsUnicode(false);

            modelBuilder.Entity<Cuenta>()
                .HasMany(e => e.Movimiento)
                .WithOptional(e => e.Cuenta)
                .HasForeignKey(e => e.Id_Cuenta);

            modelBuilder.Entity<Cuenta>()
                .HasMany(e => e.Transferencia)
                .WithOptional(e => e.Cuenta)
                .HasForeignKey(e => e.Id_CuentaEnvia);

            modelBuilder.Entity<Cuenta>()
                .HasMany(e => e.Transferencia1)
                .WithOptional(e => e.Cuenta1)
                .HasForeignKey(e => e.Id_CuentaRecibe);

            modelBuilder.Entity<Cuenta>()
                .HasMany(e => e.Usuario)
                .WithOptional(e => e.Cuenta)
                .HasForeignKey(e => e.Id_Cuenta);

            modelBuilder.Entity<Movimiento>()
                .Property(e => e.Tipo_Movimiento)
                .IsUnicode(false);

            modelBuilder.Entity<TipoCuenta>()
                .Property(e => e.Tipo)
                .IsUnicode(false);

            modelBuilder.Entity<TipoCuenta>()
                .HasMany(e => e.Cuenta)
                .WithOptional(e => e.TipoCuenta)
                .HasForeignKey(e => e.Id_TipoCuenta);

            modelBuilder.Entity<Usuario>()
                .Property(e => e.NombreCompleto)
                .IsUnicode(false);

            modelBuilder.Entity<Usuario>()
                .Property(e => e.DNI)
                .IsUnicode(false);

            modelBuilder.Entity<Usuario>()
                .Property(e => e.Sexo)
                .IsUnicode(false);

            modelBuilder.Entity<Usuario>()
                .Property(e => e.Email)
                .IsUnicode(false);

            modelBuilder.Entity<Usuario>()
                .Property(e => e.Contraseña)
                .IsUnicode(false);
        }
    }
}
