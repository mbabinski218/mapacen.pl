using MapacenBackend.Entities;
using System.ComponentModel.DataAnnotations;

namespace MapacenBackend.Models.OfferDtos
{
    public class CreateOfferDto
    {
        [Required]
        public decimal Price { get; set; }

        [Required]
        public int ProductId { get; set; }

        [Required]
        public int SalesPointId { get; set; }
    }
}
