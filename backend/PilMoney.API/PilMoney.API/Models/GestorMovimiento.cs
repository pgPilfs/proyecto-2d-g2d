﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;

namespace PilMoney.API.Models
{
    public class GestorMovimiento
    {

        public void AgregarMovimiento(Movimiento movimiento)
        {
            string connection = ConfigurationManager.ConnectionStrings["database"].ToString();

            using (SqlConnection sqlConnection = new SqlConnection(connection))
            {
                sqlConnection.Open();

                SqlCommand sqlCommand = sqlConnection.CreateCommand();
                sqlCommand.CommandText = "INSERT INTO dbo.Movimiento (Id_Cuenta, Fecha_Hora, Monto, Tipo_Movimiento) VALUES (@Id_Cuenta, @Fecha_Hora, @Monto, @Tipo_Movimiento);";
                sqlCommand.Parameters.Add(new SqlParameter("@Id_Cuenta", movimiento.Id_Cuenta1));
                sqlCommand.Parameters.Add(new SqlParameter("@Tipo_Movimiento", movimiento.Tipo_Movimiento1));
                sqlCommand.Parameters.Add(new SqlParameter("@Fecha_Hora", movimiento.Fecha_Hora1));
                sqlCommand.Parameters.Add(new SqlParameter("@Monto", movimiento.Monto1));
                sqlCommand.ExecuteNonQuery();
            }
        }
        public List<Movimiento> ListarMovimientos()
        {
            List<Movimiento> listadoMovimientos = new List<Movimiento>();

            string connection = ConfigurationManager.ConnectionStrings["database"].ToString();

            using (SqlConnection sqlConnection = new SqlConnection(connection))
            {
                sqlConnection.Open();

                SqlCommand sqlCommand = sqlConnection.CreateCommand();
                sqlCommand.CommandText = "SELECT * FROM Movimiento";

                SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                while (sqlDataReader.Read())
                    {
                        int id = sqlDataReader.GetInt32(0);
                        int id_Cuenta = sqlDataReader.GetInt32(1);
                        DateTime fecha_Hora = sqlDataReader.GetDateTime(2);
                        float monto = (float)sqlDataReader.GetDouble(3);
                        string tipo_Movimiento = sqlDataReader.GetValue(4).ToString();
                    

                    Movimiento movimiento = new Movimiento(id, id_Cuenta, fecha_Hora, monto, tipo_Movimiento);
                        listadoMovimientos.Add(movimiento);
                    }

                sqlDataReader.Close();
                sqlConnection.Close();

                return listadoMovimientos;
            }

        }


    }
}