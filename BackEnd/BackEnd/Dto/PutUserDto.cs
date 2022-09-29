using BackEnd.CustomValidationAttribute;
using System.ComponentModel.DataAnnotations;

namespace BackEnd.Dto
{
    public class PutUserDto
    {
        [EmailAddress]
        [Required]
        public string Email { get; set; }

        [CheckPassword]
        public string Password { get; set; }

        [Required]
        public string RoleName { get; set; }
    }
}
