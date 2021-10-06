using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;
using PilMoney.API.Models;
using PilMoney.API.Controllers;
using System.Web.Http.Cors;

namespace PilMoney.API.Controllers
{
    [AllowAnonymous]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/login")]
    public class LoginController : ApiController
    {
        [HttpGet]
        [Route("echoping")]
        public IHttpActionResult EchoPing()
        {
            return Ok(true);
        }
        [HttpPost]
        [Route("auth")]
        public IHttpActionResult Auth(LoginRequest login)
        {
            if (login == null) return BadRequest();

                if (usuariosController.usuarioAndPass(login.Username, login.Password))
                {
                    var id = usuariosController.getIdUsuario(login.Username);
                    var token = TokenGenerator.GenerateTokenJwt(login.Username);
                    var userToken = new UserToken();
                    userToken.Id = id;
                    userToken.Username = login.Username;
                    userToken.Token = token;

                    return Ok(userToken);
                }
                else
                {
                    return Unauthorized();
                }
        }
    }
}
