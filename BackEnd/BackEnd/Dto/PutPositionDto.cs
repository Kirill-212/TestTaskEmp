using BackEnd.CustomValidationAttribute;
using System.ComponentModel.DataAnnotations;

namespace BackEnd.Dto
{
    public class PutPositionDto
    {
        [Required]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Name lenght between from 3 to 50")]
        public string Name { get; set; }

        [CheckNewName]
        public string NewName { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 10, ErrorMessage = "Description lenght between from 10 to 50")]
        public string Description { get; set; }
    }
}
