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
    public class MovimientoesController : ApiController
    {
        private Model1 db = new Model1();

        // GET: api/Movimientoes
        public IQueryable<Movimiento> GetMovimiento()
        {
            return db.Movimiento;
        }

        // GET: api/Movimientoes/5
        [ResponseType(typeof(Movimiento))]
        public IHttpActionResult GetMovimiento(int id)
        {
            Movimiento movimiento = db.Movimiento.Find(id);
            if (movimiento == null)
            {
                return NotFound();
            }

            return Ok(movimiento);
        }

        // PUT: api/Movimientoes/5
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

        // POST: api/Movimientoes
        [ResponseType(typeof(Movimiento))]
        public IHttpActionResult PostMovimiento(Movimiento movimiento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Movimiento.Add(movimiento);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = movimiento.Id }, movimiento);
        }

        // DELETE: api/Movimientoes/5
        [ResponseType(typeof(Movimiento))]
        public IHttpActionResult DeleteMovimiento(int id)
        {
            Movimiento movimiento = db.Movimiento.Find(id);
            if (movimiento == null)
            {
                return NotFound();
            }

            db.Movimiento.Remove(movimiento);
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
            return db.Movimiento.Count(e => e.Id == id) > 0;
        }
    }
}