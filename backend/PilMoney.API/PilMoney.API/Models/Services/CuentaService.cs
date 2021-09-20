using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PilMoney.API.Models.Services
{
    public class CuentaService
    {
        private readonly ApplicationDbContext _context;
        public CuentaService(ApplicationDbContext context)
        {
            _context = context;
        }

        public CuentaService()
        {
        }

        public Cuenta MostrarPorId(int Id)
        {
            var cuentaEncontrado = _context.Cuentas.Where(x => x.Id == Id).FirstOrDefault();
            if (cuentaEncontrado != null)
            {
                return cuentaEncontrado;
            }
            return null;
        }

        public List<Cuenta> MostrarTodos()
        {
            List<Cuenta> cuentas = _context.Cuentas.ToList();
            return cuentas;
        }

        public Cuenta Guardar(Cuenta cuenta)
        {

            _context.Cuentas.Add(cuenta);
            _context.SaveChanges();

            return cuenta;
        }

        public Cuenta Modificar(int Id, Cuenta cuenta)
        {
            var cuentaEncontrado = _context.Cuentas.Where(x => x.Id == Id).FirstOrDefault();
            if (cuentaEncontrado != null)
            {
                cuentaEncontrado.Saldo = cuenta.Saldo;
                cuentaEncontrado.Estado = cuenta.Estado;
                cuentaEncontrado.Id_TipoCuenta = cuenta.Id_TipoCuenta;

                _context.Cuentas.Add(cuentaEncontrado);
                _context.SaveChanges();
            }
            return cuenta;
        }

        public Cuenta Eliminar(int Id)
        {
            var cuentaEncontrado = _context.Cuentas.Where(x => x.Id == Id).FirstOrDefault();
            if (cuentaEncontrado != null)
            {
                _context.Cuentas.Remove(cuentaEncontrado);
                _context.SaveChanges();
            }
            return cuentaEncontrado;
        }
    }
}