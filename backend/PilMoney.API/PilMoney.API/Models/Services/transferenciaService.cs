using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PilMoney.API.Models.Services
{
    public class transferenciaService
    {
        private readonly ApplicationDbContext _context;
        public transferenciaService(ApplicationDbContext context)
        {
            _context = context;
        }

        public transferenciaService(){

        }

        public Transferencia transferir(int Id, int IdCuentaOrigen, int IdCuentaDestino, int monto){

            var Cuenta cuentaOrigen = _context.Cuentas.Where(x => x.IdCuentaOrigen == Id).FirstOrDefault();
            var Cuenta cuentaDestino = _context.Cuentas.Where(x => x.IdCuentaDestino == Id).FirstOrDefault();


            // Transferencia del dinero de una cuenta a la otra
            cuentaOrigen.Saldo = cuentaOrigen.Saldo - monto;
            cuentaDestino.Saldo = cuentaOrigen.Saldo + monto;
        }

    }    
}