using System;

namespace BackEnd.Models
{
    public class Employee
    {
        public int UserId { get; set; }

        public User User { get; set; }

        public string Address { get; set; }

        public DateTime StartWorkDate { get; set; }

        public int PositionId { get; set; }

        public Position Position { get; set; }
    }
}
