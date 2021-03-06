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
    public class cuentasController : ApiController
    {
        private ModelsConfig db = new ModelsConfig();

        // GET: api/cuentas
        [Authorize]
        public IQueryable<cuentas> Getcuentas()
        {
            return db.cuentas;
        }

        // GET: api/cuentas/5
        [Authorize]
        [ResponseType(typeof(cuentas))]
        public IHttpActionResult Getcuentas(int id)
        {
            cuentas cuentas = db.cuentas.Find(id);
            if (cuentas == null)
            {
                return NotFound();
            }

            return Ok(cuentas);
        }

        // PUT: api/cuentas/5
        [Authorize]
        [ResponseType(typeof(void))]
        public IHttpActionResult Putcuentas(int id, cuentas cuentas)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != cuentas.id)
            {
                return BadRequest();
            }

            var existingEntity = db.cuentas.Find(id);
            db.Entry(existingEntity).CurrentValues.SetValues(cuentas);

            // db.Entry(cuentas).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!cuentasExists(id))
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

        // POST: api/cuentas
        [ResponseType(typeof(cuentas))]
        public IHttpActionResult Postcuentas()
        {

            cuentas cuentas = new cuentas();

            cuentas.saldo = 0;
            cuentas.cvu = CVUGenerator();
            cuentas.estado = "Activo";
            cuentas.fecha_alta = DateTime.Now;
            cuentas.id_tipo_cuenta = 1;

            db.cuentas.Add(cuentas);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = cuentas.id }, cuentas);
        }

        // DELETE: api/cuentas/5
        [Authorize]
        [ResponseType(typeof(cuentas))]
        public IHttpActionResult Deletecuentas(int id)
        {
            cuentas cuentas = db.cuentas.Find(id);
            if (cuentas == null)
            {
                return NotFound();
            }

            db.cuentas.Remove(cuentas);
            db.SaveChanges();

            return Ok(cuentas);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool cuentasExists(int id)
        {
            return db.cuentas.Count(e => e.id == id) > 0;
        }

        private string CVUGenerator()
        {
            Random r = new Random();
            string numero = "";
            for (int i = 0; i < 10; i++)
            {
                numero += r.Next(0, 9).ToString();
            }
            return numero;
        }
    }
}