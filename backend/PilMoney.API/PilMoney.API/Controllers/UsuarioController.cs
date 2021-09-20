using System;
using PilMoney.API.Models.Services;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using PilMoney.API.Models.Entities;

namespace PilMoney.API.Controllers
{
	public class UsuarioController : Controllers
	{
		private UsuarioService _usuarioService;
		public UsuarioController()
		{
			_usuarioService = new UsuarioService();
		}
		// POST: api/Usuario
		public Usuario Post(Usuario usuario)
		{
			_usuarioService.Guardar(usuario);
			return usuario;
		}
		// PUT: api/Cuenta/id
		public Usuario Put(int id, [FromBody] Usuario usuario)
		{
			_usuarioService.Modificar(id, usuario);
			return usuario;
		}
		
	}
}


