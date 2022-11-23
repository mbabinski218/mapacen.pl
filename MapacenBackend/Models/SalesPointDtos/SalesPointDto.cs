using MapacenBackend.Entities;
using MapacenBackend.Models.AddressDtos;
using MapacenBackend.Models.OfferDtos;

namespace MapacenBackend.Models.SalesPointDtos
{
    public class SalesPointDto
    {
        public string Name { get; set; }
        public AddressDto Address { get; set; }
        public List<OfferDto> Offers { get; set; }
    }
}
