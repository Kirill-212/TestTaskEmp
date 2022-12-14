using System.Text.Json.Serialization;

namespace BackEnd.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public Role Role { get; set; }

        public int RoleId { get; set; }

        [JsonIgnore]
        public Employee Employee { get; set; }
    }
}
