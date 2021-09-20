using System;
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
                sqlCommand.CommandText = "insertar_movimiento";
                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlCommand.Parameters.Add(new SqlParameter("@Id_Cuenta", movimiento.Id_Cuenta1));
                sqlCommand.Parameters.Add(new SqlParameter("@Tipo_Movimiento", movimiento.Tipo_Movimiento1));
                sqlCommand.Parameters.Add(new SqlParameter("@Fecha_Hora", movimiento.Fecha_Hora1));
                sqlCommand.Parameters.Add(new SqlParameter("@Monto", movimiento.Monto1));
                sqlCommand.ExecuteNonQuery();
            }
        }

    }
}