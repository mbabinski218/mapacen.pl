using MapacenBackend.Entities;
using System.ComponentModel.DataAnnotations;

namespace MapacenBackend.Models.OfferDtos
{
    public class CreateOfferDto
    {
        [Required]
        public decimal Price { get; set; }

        [Required]
        public Product Product { get; set; }

        [Required]
        public SalesPoint SalesPoint { get; set; }
    }
}
