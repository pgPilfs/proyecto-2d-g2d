using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PilMoney.API.Models
{
    public class Movimiento
    {
        private int Id;
        private int Id_Cuenta;
        private DateTime Fecha_Hora;
        private float Monto;
        private string Tipo_Movimiento;
        

        public Movimiento()
        {
        }

        public Movimiento(int id, int id_Cuenta, DateTime fecha_Hora,  float monto, string tipo_Movimiento)
        {
            Id1 = id;
            Id_Cuenta1 = id_Cuenta;
            Fecha_Hora1 = fecha_Hora;
            Monto1 = monto;
            Tipo_Movimiento1 = tipo_Movimiento;
            
        }

        public int Id1 { get => Id; set => Id = value; }
        public DateTime Fecha_Hora1 { get => Fecha_Hora; set => Fecha_Hora = value; }
        public float Monto1 { get => Monto; set => Monto = value; }
        public string Tipo_Movimiento1 { get => Tipo_Movimiento; set => Tipo_Movimiento = value; }
        public int Id_Cuenta1 { get => Id_Cuenta; set => Id_Cuenta = value; }
    }
}