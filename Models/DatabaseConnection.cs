

using MySql.Data.MySqlClient;

namespace Whatsbot.Models
{
    public class DatabaseConnection
    {
        private string connectionString = "Server=localhost;Database=Whatsbot;Uid=root;Pwd=Qwerty@123;";

        public MySqlConnection GetConnection()
        {
            MySqlConnection conn = new MySqlConnection(connectionString);
            conn.Open();
            return conn;
        }
    }

}