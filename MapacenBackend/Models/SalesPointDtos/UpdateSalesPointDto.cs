using MapacenBackend.Models.AddressDtos;
using System.ComponentModel.DataAnnotations;

namespace MapacenBackend.Models.SalesPointDtos
{
    public class UpdateSalesPointDto
    {
        [MaxLength(128)]
        [MinLength(1)]
        public string? Name { get; set; }

        public UpdateAddressDto? address { get; set; }
    }
}
