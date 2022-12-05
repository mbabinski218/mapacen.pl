using MapacenBackend.Entities;
using MapacenBackend.Models.AddressDtos;
using System.ComponentModel.DataAnnotations;

namespace MapacenBackend.Models.SalesPointDtos
{
    public class CreateSalesPointDto
    {
        [Required]
        [MaxLength(128)]
        [MinLength(1)]
        public string Name { get; set; }

        [Required]
        public CreateAddressDto Address { get; set; }

    }
}
