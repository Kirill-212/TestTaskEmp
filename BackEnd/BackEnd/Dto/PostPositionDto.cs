using System.ComponentModel.DataAnnotations;

namespace BackEnd.Dto
{
    public class PostPositionDto
    {

        [Required]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Name lenght between from 3 to 50")]
        public string Name { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 10, ErrorMessage = "Description lenght between from 10 to 50")]
        public string Description { get; set; }
    }
}
