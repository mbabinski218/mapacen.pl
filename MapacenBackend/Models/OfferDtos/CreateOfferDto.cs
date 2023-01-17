using MapacenBackend.Entities;
using System.ComponentModel.DataAnnotations;

namespace MapacenBackend.Models.OfferDtos
{
    public class CreateOfferDto
    {
        [Required(ErrorMessage = "Pole jest wymagane")]
        public decimal Price { get; set; }

        [Required(ErrorMessage = "Pole jest wymagane")]
        public int ProductId { get; set; }

        [Required(ErrorMessage = "Pole jest wymagane")]
        public int SalesPointId { get; set; }
    }
}
