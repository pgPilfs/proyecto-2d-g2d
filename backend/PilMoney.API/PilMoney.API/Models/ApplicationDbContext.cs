using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;

namespace PilMoney.API
{
    public partial class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext()
            : base("name=ApplicationDbContext")
        {
        }

        public virtual DbSet<Cuenta> Cuentas { get; set; }
        public virtual DbSet<Movimiento> Movimientoes { get; set; }
        public virtual DbSet<TipoCuenta> TipoCuentas { get; set; }
        public virtual DbSet<Transferencia> Transferencias { get; set; }
        public virtual DbSet<Usuario> Usuarios { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cuenta>()
                .Property(e => e.CVU)
                .IsUnicode(false);

            modelBuilder.Entity<Cuenta>()
                .Property(e => e.Estado)
                .IsUnicode(false);

            modelBuilder.Entity<Cuenta>()
                .HasMany(e => e.Movimientoes)
                .WithOptional(e => e.Cuenta)
                .HasForeignKey(e => e.Id_Cuenta);

            modelBuilder.Entity<Cuenta>()
                .HasMany(e => e.Transferencias)
                .WithOptional(e => e.Cuenta)
                .HasForeignKey(e => e.Id_CuentaEnvia);

            modelBuilder.Entity<Cuenta>()
                .HasMany(e => e.Transferencias1)
                .WithOptional(e => e.Cuenta1)
                .HasForeignKey(e => e.Id_CuentaRecibe);

            modelBuilder.Entity<Cuenta>()
                .HasMany(e => e.Usuarios)
                .WithOptional(e => e.Cuenta)
                .HasForeignKey(e => e.Id_Cuenta);

            modelBuilder.Entity<Movimiento>()
                .Property(e => e.Tipo_Movimiento)
                .IsUnicode(false);

            modelBuilder.Entity<TipoCuenta>()
                .Property(e => e.Tipo)
                .IsUnicode(false);

            modelBuilder.Entity<TipoCuenta>()
                .HasMany(e => e.Cuentas)
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
