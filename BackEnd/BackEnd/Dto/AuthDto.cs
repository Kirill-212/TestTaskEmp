using System.ComponentModel.DataAnnotations;

namespace BackEnd.Dto
{
    public class AuthDto
    {
        [EmailAddress]
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
