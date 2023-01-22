using MapacenBackend.Entities;
using System.ComponentModel.DataAnnotations;

namespace MapacenBackend.Models.OfferDtos
{
    public class UpdateOfferDto
    {
        public decimal? Price { get; set; }
    }
}
