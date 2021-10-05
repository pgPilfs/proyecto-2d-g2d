﻿using System;
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
                    var token = TokenGenerator.GenerateTokenJwt(login.Username);
                    login.Token = token;
                    return Ok(login);
                }
                else
                {
                    return Unauthorized();
                }
            }

            

            //var isUserValid = (login.Username == "user" && login.Password == "123456");
            //if (isUserValid)
            //{
            //    var token = TokenGenerator.GenerateTokenJwt(login.Username);
            //    login.Token = token;
            //    return Ok(login);
            //}
            //else
            //{
            //    return Unauthorized();
            //}
        

    }
}
