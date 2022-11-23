using MapacenBackend.Entities;
using MapacenBackend.Models.CategoryDtos;
using System.ComponentModel.DataAnnotations;

namespace MapacenBackend.Models.ProductDtos
{
    public class CreateProductDto
    {
        [Required]
        [MaxLength(32)]
        [MinLength(1)]
        public string Name { get; set; }

        [Required]
        public int CategoryId{ get; set; }

    }
}
