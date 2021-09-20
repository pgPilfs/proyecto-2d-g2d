using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PilMoney.API.Models.Services
{
	public class UsuarioService
	{
		private readonly ApplicationDbContext _context;
		public UsuarioService(ApplicationDbContext context)
		{
			_context = context;
		}
		public Usuario Guardar(Usuario usuario)
		{

			_context.Usuarios.Add(usuario);
			_context.SaveChanges();

			return usuario;
		}
		public Usuario Modificar(int Id, Usuario usuario)
		{
			var usuarioEncontrado = _context.Usuarios.Where(x => x.Id == Id).FirstOrDefault();
			if (usuarioEncontrado != null)
			{
				usuarioEncontrado.NombreCompleto = usuario.NombreCompleto;
				usuarioEncontrado.DNI = usuario.DNI;
				usuarioEncontrado.Sexo = usuario.Sexo;
				usuarioEncontrado.Fecha_Nac = usuario.Fecha_Nac;
				usuarioEncontrado.Email = usuario.Email;
				usuarioEncontrado.Contraseña = usuario.Contraseña;
				usuarioEncontrado.Id_Cuenta = usuario.Id_Cuenta;

				_context.Usuarios.Add(usuarioEncontrado);
				_context.SaveChanges();
			}
			return usuario;
		}
	}
}


