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

        public virtual DbSet<cuentas> cuentas { get; set; }
        public virtual DbSet<movimientos> movimientos { get; set; }
        public virtual DbSet<sysdiagrams> sysdiagrams { get; set; }
        public virtual DbSet<tipo_cuenta> tipo_cuenta { get; set; }
        public virtual DbSet<transferencias> transferencias { get; set; }
        public virtual DbSet<usuarios> usuarios { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<cuentas>()
                .Property(e => e.cvu)
                .IsUnicode(false);

            modelBuilder.Entity<cuentas>()
                .Property(e => e.estado)
                .IsUnicode(false);

            modelBuilder.Entity<cuentas>()
                .HasMany(e => e.movimientos)
                .WithOptional(e => e.cuentas)
                .HasForeignKey(e => e.id_cuenta);

            modelBuilder.Entity<cuentas>()
                .HasMany(e => e.transferencias)
                .WithOptional(e => e.cuentas)
                .HasForeignKey(e => e.id_cuenta_envia);

            modelBuilder.Entity<cuentas>()
                .HasMany(e => e.transferencias1)
                .WithOptional(e => e.cuentas1)
                .HasForeignKey(e => e.id_cuenta_recibe);

            modelBuilder.Entity<cuentas>()
                .HasMany(e => e.usuarios)
                .WithOptional(e => e.cuentas)
                .HasForeignKey(e => e.id_cuenta);

            modelBuilder.Entity<movimientos>()
                .Property(e => e.tipo_movimiento)
                .IsUnicode(false);

            modelBuilder.Entity<tipo_cuenta>()
                .Property(e => e.tipo)
                .IsUnicode(false);

            modelBuilder.Entity<tipo_cuenta>()
                .HasMany(e => e.cuentas)
                .WithOptional(e => e.tipo_cuenta)
                .HasForeignKey(e => e.id_tipo_cuenta);

            modelBuilder.Entity<usuarios>()
                .Property(e => e.nombre_completo)
                .IsUnicode(false);

            modelBuilder.Entity<usuarios>()
                .Property(e => e.dni)
                .IsUnicode(false);

            modelBuilder.Entity<usuarios>()
                .Property(e => e.sexo)
                .IsUnicode(false);

            modelBuilder.Entity<usuarios>()
                .Property(e => e.email)
                .IsUnicode(false);

            modelBuilder.Entity<usuarios>()
                .Property(e => e.password)
                .IsUnicode(false);
        }
    }
}
