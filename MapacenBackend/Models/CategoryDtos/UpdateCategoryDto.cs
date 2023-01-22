using System.ComponentModel.DataAnnotations;

namespace MapacenBackend.Models.CategoryDtos
{
    public class UpdateCategoryDto
    {
        [MaxLength(32, ErrorMessage ="Za długa nazwa")]
        public string? Name { get; set; }
    }
}
