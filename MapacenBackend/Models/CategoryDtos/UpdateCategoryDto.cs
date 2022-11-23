using System.ComponentModel.DataAnnotations;

namespace MapacenBackend.Models.CategoryDtos
{
    public class UpdateCategoryDto
    {
        [MaxLength(32)]
        public string? Name { get; set; }
    }
}
