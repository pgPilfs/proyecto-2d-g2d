﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PilMoney.API.Models
{
    public class UserToken
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }
    }
}