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
    [Authorize]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class transferenciasController : ApiController
    {
        private ModelsConfig db = new ModelsConfig();

        // GET: api/transferencias
        public IQueryable<transferencias> Gettransferencias()
        {
            return db.transferencias;
        }

        // GET: api/transferencias/5
        [ResponseType(typeof(transferencias))]
        public IHttpActionResult Gettransferencias(int id)
        {
            transferencias transferencias = db.transferencias.Find(id);
            if (transferencias == null)
            {
                return NotFound();
            }

            return Ok(transferencias);
        }

        // PUT: api/transferencias/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Puttransferencias(int id, transferencias transferencias)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != transferencias.id)
            {
                return BadRequest();
            }

            db.Entry(transferencias).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!transferenciasExists(id))
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

        // POST: api/transferencias
        [ResponseType(typeof(transferencias))]
        public IHttpActionResult Posttransferencias(transferencias transferencias)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.transferencias.Add(transferencias);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = transferencias.id }, transferencias);
        }

        // DELETE: api/transferencias/5
        [ResponseType(typeof(transferencias))]
        public IHttpActionResult Deletetransferencias(int id)
        {
            transferencias transferencias = db.transferencias.Find(id);
            if (transferencias == null)
            {
                return NotFound();
            }

            db.transferencias.Remove(transferencias);
            db.SaveChanges();

            return Ok(transferencias);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool transferenciasExists(int id)
        {
            return db.transferencias.Count(e => e.id == id) > 0;
        }
    }
}