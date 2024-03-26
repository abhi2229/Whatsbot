using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using Whatsbot.Models;

namespace Whatsbot.Controllers
{
    public class ChatController : Controller
    {
        private readonly DatabaseConnection _dbConnection;

        public ChatController(DatabaseConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        [HttpPost]
        public IActionResult SaveConversation([FromBody] ConversationData data)
        {
            if (data == null)
            {
                return BadRequest("Invalid data provided.");
            }

            try
            {
                using (var conn = _dbConnection.GetConnection())
                {
                    string query = "INSERT INTO ChatHistory (UserInput, ChatbotResponse) VALUES (@userInput, @chatbotResponse)";
                    using (var cmd = new SqlCommand(query, conn))
                    {
                        cmd.Parameters.AddWithValue("@userInput", data.UserInput);
                        cmd.Parameters.AddWithValue("@chatbotResponse", data.ChatbotResponse);
                        cmd.ExecuteNonQuery();
                    }
                }
                return Ok("Conversation data saved successfully!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error saving conversation data: " + ex.Message);
            }
        }
    }
}
