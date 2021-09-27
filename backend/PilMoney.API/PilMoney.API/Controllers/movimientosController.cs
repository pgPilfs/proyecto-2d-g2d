using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using PilMoney.API.Models;

namespace PilMoney.API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class movimientosController : ApiController
    {
        private ModelsConfig db = new ModelsConfig();

        // GET: api/movimientos
        public IQueryable<movimientos> Getmovimientos()
        {
            return db.movimientos;
        }

        // GET: api/movimientos/5
        [ResponseType(typeof(movimientos))]
        public IHttpActionResult Getmovimientos(int id)
        {
            movimientos movimientos = db.movimientos.Find(id);
            if (movimientos == null)
            {
                return NotFound();
            }

            return Ok(movimientos);
        }

        // PUT: api/movimientos/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putmovimientos(int id, movimientos movimientos)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != movimientos.id)
            {
                return BadRequest();
            }

            db.Entry(movimientos).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!movimientosExists(id))
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

        // POST: api/movimientos
        [ResponseType(typeof(movimientos))]
        public IHttpActionResult Postmovimientos(movimientos movimientos)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.movimientos.Add(movimientos);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (movimientosExists(movimientos.id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = movimientos.id }, movimientos);
        }

        // DELETE: api/movimientos/5
        [ResponseType(typeof(movimientos))]
        public IHttpActionResult Deletemovimientos(int id)
        {
            movimientos movimientos = db.movimientos.Find(id);
            if (movimientos == null)
            {
                return NotFound();
            }

            db.movimientos.Remove(movimientos);
            db.SaveChanges();

            return Ok(movimientos);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool movimientosExists(int id)
        {
            return db.movimientos.Count(e => e.id == id) > 0;
        }
    }
}