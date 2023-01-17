using MapacenBackend.Entities;
using MapacenBackend.Models.CategoryDtos;
using System.ComponentModel.DataAnnotations;

namespace MapacenBackend.Models.ProductDtos
{
    public class UpdateProductDto
    {
        [MaxLength(32, ErrorMessage = "Nazwa jest za długa")]
        [MinLength(1, ErrorMessage = "Niepoprawne dane")]
        public string? Name { get; set; }

        public int? CategoryId { get; set; }
    }
}
