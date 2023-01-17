using System.ComponentModel.DataAnnotations;

namespace MapacenBackend.Models.CategoryDtos
{
    public class CreateCategoryDto
    {
        [Required(ErrorMessage ="Pole jest wymagane")]
        [MaxLength(32, ErrorMessage = "Za długa nazwa")]
        public string Name { get; set; }
    }
}
