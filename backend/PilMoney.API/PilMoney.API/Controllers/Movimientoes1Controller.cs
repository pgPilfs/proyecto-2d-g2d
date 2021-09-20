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
    public class Movimientoes1Controller : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Movimientoes1
        public IQueryable<Movimiento> GetMovimientoes()
        {
            return db.Movimientoes;
        }

        // GET: api/Movimientoes1/5
        [ResponseType(typeof(Movimiento))]
        public IHttpActionResult GetMovimiento(int id)
        {
            Movimiento movimiento = db.Movimientoes.Find(id);
            if (movimiento == null)
            {
                return NotFound();
            }

            return Ok(movimiento);
        }

        // PUT: api/Movimientoes1/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMovimiento(int id, Movimiento movimiento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != movimiento.Id)
            {
                return BadRequest();
            }

            db.Entry(movimiento).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovimientoExists(id))
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

        // POST: api/Movimientoes1
        [ResponseType(typeof(Movimiento))]
        public IHttpActionResult PostMovimiento(Movimiento movimiento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Movimientoes.Add(movimiento);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = movimiento.Id }, movimiento);
        }

        // DELETE: api/Movimientoes1/5
        [ResponseType(typeof(Movimiento))]
        public IHttpActionResult DeleteMovimiento(int id)
        {
            Movimiento movimiento = db.Movimientoes.Find(id);
            if (movimiento == null)
            {
                return NotFound();
            }

            db.Movimientoes.Remove(movimiento);
            db.SaveChanges();

            return Ok(movimiento);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MovimientoExists(int id)
        {
            return db.Movimientoes.Count(e => e.Id == id) > 0;
        }
    }
}