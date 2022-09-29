using System.ComponentModel.DataAnnotations;

namespace BackEnd.Dto
{
    public class PostRoleDto
    {
        [Required]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Role name lenght between from 3 to 50")]
        public string RoleName { get; set; }
    }
}
