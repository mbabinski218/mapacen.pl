using System.ComponentModel.DataAnnotations;

namespace MapacenBackend.Models.CategoryDtos
{
    public class CreateCategoryDto
    {
        [Required]
        [MaxLength(32)]
        public string Name { get; set; }
    }
}
