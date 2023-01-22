using MapacenBackend.Entities;
using MapacenBackend.Models.AddressDtos;
using System.ComponentModel.DataAnnotations;

namespace MapacenBackend.Models.SalesPointDtos
{
    public class CreateSalesPointDto
    {
        [Required(ErrorMessage = "Pole jest wymagane")]
        [MaxLength(128, ErrorMessage = "Nazwa jest za długa")]
        [MinLength(1, ErrorMessage = "Niepoprawne dane")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Pole jest wymagane")]
        public CreateAddressDto Address { get; set; }

    }
}
