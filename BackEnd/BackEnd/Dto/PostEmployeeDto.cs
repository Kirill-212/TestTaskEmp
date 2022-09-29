using System.ComponentModel.DataAnnotations;

namespace BackEnd.Dto
{
    public class PostEmployeeDto
    {
        [EmailAddress]
        [Required]
        public string Email { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Address lenght between from 3 to 50")]
        public string Address { get; set; }

        [Required]
        public string PositionName { get; set; }
    }
}
