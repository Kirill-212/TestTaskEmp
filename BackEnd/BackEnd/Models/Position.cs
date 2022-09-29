using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BackEnd.Models
{
    public class Position
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        [JsonIgnore]
        public List<User> Employees { get; set; }
    }
}
