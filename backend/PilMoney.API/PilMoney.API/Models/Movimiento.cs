using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PilMoney.API.Models
{
    public class Movimiento
    {
        private int Id;
        private DateTime Fecha_Hora;
        private float Monto;
        private string Tipo_Movimiento;
        private int Id_Cuenta;

        public Movimiento()
        {
        }

        public Movimiento(int id, DateTime fecha_Hora, float monto, string tipo_Movimiento, int id_Cuenta)
        {
            Id1 = id;
            Fecha_Hora1 = fecha_Hora;
            Monto1 = monto;
            Tipo_Movimiento1 = tipo_Movimiento;
            Id_Cuenta1 = id_Cuenta;
        }

        public int Id1 { get => Id; set => Id = value; }
        public DateTime Fecha_Hora1 { get => Fecha_Hora; set => Fecha_Hora = value; }
        public float Monto1 { get => Monto; set => Monto = value; }
        public string Tipo_Movimiento1 { get => Tipo_Movimiento; set => Tipo_Movimiento = value; }
        public int Id_Cuenta1 { get => Id_Cuenta; set => Id_Cuenta = value; }
    }
}