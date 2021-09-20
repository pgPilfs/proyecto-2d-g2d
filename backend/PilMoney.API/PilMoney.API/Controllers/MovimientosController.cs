using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using PilMoney.API.Models;
using PilMoney.API.Controllers;

namespace PilMoney.API.Controllers
{
    public class MovimientosController : ApiController
    {
        // GET: api/Movimientos
        public IEnumerable<Movimiento> Get()
        {
            GestorMovimiento gestorMovimiento = new GestorMovimiento();
            return gestorMovimiento.ListarMovimientos();
        }

        // GET: api/Movimientos/5
        public string Get(int id)
        {
            GestorMovimiento gestorMovimiento = new GestorMovimiento();
            return "value";
        }

        // POST: api/Movimientos
        public void Post([FromBody]Movimiento value)
        {
            GestorMovimiento gestorMovimiento = new GestorMovimiento();
            gestorMovimiento.AgregarMovimiento(value);
        }

        // PUT: api/Movimientos/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Movimientos/5
        public void Delete(int id)
        {
        }
    }
}
