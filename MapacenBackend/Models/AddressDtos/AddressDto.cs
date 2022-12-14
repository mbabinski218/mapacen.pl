using MapacenBackend.Entities;

namespace MapacenBackend.Models.AddressDtos
{
    public class AddressDto
    {
        public string City { get; set; }
        public string Street { get; set; }
        public string PostalCode { get; set; }
        public int Number { get; set; }
        public County County { get; set; }
    }
}
