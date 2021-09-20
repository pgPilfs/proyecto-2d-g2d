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
using PilMoney.API;

namespace PilMoney.API.Controllers
{
    public class TipoCuentasController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/TipoCuentas
        public IQueryable<TipoCuenta> GetTipoCuentas()
        {
            return db.TipoCuentas;
        }

        // GET: api/TipoCuentas/5
        [ResponseType(typeof(TipoCuenta))]
        public IHttpActionResult GetTipoCuenta(int id)
        {
            TipoCuenta tipoCuenta = db.TipoCuentas.Find(id);
            if (tipoCuenta == null)
            {
                return NotFound();
            }

            return Ok(tipoCuenta);
        }

        // PUT: api/TipoCuentas/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTipoCuenta(int id, TipoCuenta tipoCuenta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tipoCuenta.Id)
            {
                return BadRequest();
            }

            db.Entry(tipoCuenta).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TipoCuentaExists(id))
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

        // POST: api/TipoCuentas
        [ResponseType(typeof(TipoCuenta))]
        public IHttpActionResult PostTipoCuenta(TipoCuenta tipoCuenta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TipoCuentas.Add(tipoCuenta);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tipoCuenta.Id }, tipoCuenta);
        }

        // DELETE: api/TipoCuentas/5
        [ResponseType(typeof(TipoCuenta))]
        public IHttpActionResult DeleteTipoCuenta(int id)
        {
            TipoCuenta tipoCuenta = db.TipoCuentas.Find(id);
            if (tipoCuenta == null)
            {
                return NotFound();
            }

            db.TipoCuentas.Remove(tipoCuenta);
            db.SaveChanges();

            return Ok(tipoCuenta);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TipoCuentaExists(int id)
        {
            return db.TipoCuentas.Count(e => e.Id == id) > 0;
        }
    }
}