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

namespace PilMoney.API.Controllers
{
    public class TipoCuentasController : ApiController
    {
        private Model1 db = new Model1();

        // GET: api/TipoCuentas
        public IQueryable<TipoCuenta> GetTipoCuenta()
        {
            return db.TipoCuenta;
        }

        // GET: api/TipoCuentas/5
        [ResponseType(typeof(TipoCuenta))]
        public IHttpActionResult GetTipoCuenta(int id)
        {
            TipoCuenta tipoCuenta = db.TipoCuenta.Find(id);
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

            db.TipoCuenta.Add(tipoCuenta);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tipoCuenta.Id }, tipoCuenta);
        }

        // DELETE: api/TipoCuentas/5
        [ResponseType(typeof(TipoCuenta))]
        public IHttpActionResult DeleteTipoCuenta(int id)
        {
            TipoCuenta tipoCuenta = db.TipoCuenta.Find(id);
            if (tipoCuenta == null)
            {
                return NotFound();
            }

            db.TipoCuenta.Remove(tipoCuenta);
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
            return db.TipoCuenta.Count(e => e.Id == id) > 0;
        }
    }
}