using MapacenBackend.Entities;
using MapacenBackend.Models.AddressDtos;
using MapacenBackend.Models.OfferDtos;

namespace MapacenBackend.Models.SalesPointDtos
{
    public class SalesPointDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public AddressDto Address { get; set; }
    }
}
