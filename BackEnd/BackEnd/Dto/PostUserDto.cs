using System.ComponentModel.DataAnnotations;

namespace BackEnd.Dto
{
    public class PostUserDto
    {

        [EmailAddress]
        [Required]
        public string Email { get; set; }

        [Required]
        [RegularExpression(@"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", 
            ErrorMessage = "Password is not valid.1 number. 1 upper letter.1 lower letter and one '-' min 8 lenght.")]
        public string Password { get; set; }
    }
}
