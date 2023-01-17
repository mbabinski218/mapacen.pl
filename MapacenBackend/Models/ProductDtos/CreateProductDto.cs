using MapacenBackend.Entities;
using MapacenBackend.Models.CategoryDtos;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace MapacenBackend.Models.ProductDtos
{
    public class CreateProductDto
    {
        [Required(ErrorMessage = "Pole jest wymagane")]
        [MaxLength(32, ErrorMessage = "Nazwa jest za długa")]
        [MinLength(1, ErrorMessage = "Niepoprawne dane")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Pole jest wymagane")]
        public int CategoryId { get; set; }

        [Required(ErrorMessage = "Pole jest wymagane")]
        public IFormFile Image { get; set; }
    }
}
