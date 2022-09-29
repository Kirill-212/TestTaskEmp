using System.ComponentModel.DataAnnotations;

namespace BackEnd.Dto
{
    public class PutRoleDto
    {
        [Required]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Role name lenght between from 3 to 50")]
        public string RoleName { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "New role name lenght between from 3 to 50")]
        public string NewRoleName { get; set; }
    }
}
