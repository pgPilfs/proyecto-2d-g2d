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
    public class usuariosController : ApiController
    {
        private ModelsConfig db = new ModelsConfig();

        // GET: api/usuarios
        [Authorize]
        public IQueryable<usuarios> Getusuarios()
        {
            return db.usuarios;
        }

        // GET: api/usuarios/5
        [Authorize]
        [ResponseType(typeof(usuarios))]
        public IHttpActionResult Getusuarios(int id)
        {
            usuarios usuarios = db.usuarios.Find(id);
            if (usuarios == null)
            {
                return NotFound();
            }
            
            return Ok(usuarios);
        }

        // PUT: api/usuarios/5
        [Authorize]
        [ResponseType(typeof(void))]
        public IHttpActionResult Putusuarios(int id, usuarios usuarios)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != usuarios.id)
            {
                return BadRequest();
            }
            var existingEntity = db.usuarios.Find(id);
            db.Entry(existingEntity).CurrentValues.SetValues(usuarios);

            //db.Entry(usuarios).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!usuariosExists(id))
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

        // POST: api/usuarios
        [ResponseType(typeof(usuarios))]
        public IHttpActionResult Postusuarios(usuarios usuarios)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.usuarios.Add(usuarios);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = usuarios.id }, usuarios);
        }

        // DELETE: api/usuarios/5
        [Authorize]
        [ResponseType(typeof(usuarios))]
        public IHttpActionResult Deleteusuarios(int id)
        {
            usuarios usuarios = db.usuarios.Find(id);
            if (usuarios == null)
            {
                return NotFound();
            }

            db.usuarios.Remove(usuarios);
            db.SaveChanges();

            return Ok(usuarios);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool usuariosExists(int id)
        {
            return db.usuarios.Count(e => e.id == id) > 0;
        }

        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public static bool usuarioAndPass(string username, string password)
        {
            using (ModelsConfig entities = new ModelsConfig())
            {
                return entities.usuarios.Any(user => user.email.Equals(username) && user.password == password);
            }
        }

        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public static int getIdUsuario(string username)
        {
            using (ModelsConfig entities = new ModelsConfig())
            {
                var userEncontrado = entities.usuarios.Where(user => user.email.Equals(username)).FirstOrDefault<usuarios>();
                return userEncontrado.id;
            }
        }
    }
}