using System;

namespace BackEnd.Dto
{
    public class GetEmployeeDto
    {
        public string Email { get; set; }

        public string Address { get; set; }

        public string PositionName { get; set; }

        public string RoleName { get; set; }

        public DateTime StartWorkDate { get; set; }

    }
}
