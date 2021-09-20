using System;
using PilMoney.API.Models.Services;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace PilMoney.API.Controllers
{
    public class TransferenciaController : Controller
    {
        private transferenciaService _transferenciaService;

        public TransferenciaController(){
            _transferenciaService = new transferenciaService();
        }

        //POST transferir dinero
        public Transferencia Post(Transferencia transferencia)
        {
            var transf = _transferenciaService.transferir(transferencia.Id_CuentaEnvia, transferencia.Id_CuentaRecibe, transferencia.Monto);
            return transf;
        }
    }

}