using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using PilMoney.API.Models;
using System.Web.Http.Cors;

namespace PilMoney.API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class tipo_cuentaController : ApiController
    {
        private ModelsConfig db = new ModelsConfig();

        // GET: api/tipo_cuenta
        public IQueryable<tipo_cuenta> Gettipo_cuenta()
        {
            return db.tipo_cuenta;
        }

        // GET: api/tipo_cuenta/5
        [ResponseType(typeof(tipo_cuenta))]
        public IHttpActionResult Gettipo_cuenta(int id)
        {
            tipo_cuenta tipo_cuenta = db.tipo_cuenta.Find(id);
            if (tipo_cuenta == null)
            {
                return NotFound();
            }

            return Ok(tipo_cuenta);
        }

        // PUT: api/tipo_cuenta/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Puttipo_cuenta(int id, tipo_cuenta tipo_cuenta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tipo_cuenta.id)
            {
                return BadRequest();
            }

            db.Entry(tipo_cuenta).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tipo_cuentaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/tipo_cuenta
        [ResponseType(typeof(tipo_cuenta))]
        public IHttpActionResult Posttipo_cuenta(tipo_cuenta tipo_cuenta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.tipo_cuenta.Add(tipo_cuenta);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tipo_cuenta.id }, tipo_cuenta);
        }

        // DELETE: api/tipo_cuenta/5
        [ResponseType(typeof(tipo_cuenta))]
        public IHttpActionResult Deletetipo_cuenta(int id)
        {
            tipo_cuenta tipo_cuenta = db.tipo_cuenta.Find(id);
            if (tipo_cuenta == null)
            {
                return NotFound();
            }

            db.tipo_cuenta.Remove(tipo_cuenta);
            db.SaveChanges();

            return Ok(tipo_cuenta);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tipo_cuentaExists(int id)
        {
            return db.tipo_cuenta.Count(e => e.id == id) > 0;
        }
    }
}