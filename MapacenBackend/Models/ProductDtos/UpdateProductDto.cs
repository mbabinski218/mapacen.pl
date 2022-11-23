using MapacenBackend.Entities;
using MapacenBackend.Models.CategoryDtos;
using System.ComponentModel.DataAnnotations;

namespace MapacenBackend.Models.ProductDtos
{
    public class UpdateProductDto
    {
        [MaxLength(32)]
        [MinLength(1)]
        public string? Name { get; set; }

        public CategoryDto? Category { get; set; }
    }
}
