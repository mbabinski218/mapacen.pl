using MapacenBackend.Entities;
using System.ComponentModel.DataAnnotations;

namespace MapacenBackend.Models.AddressDtos
{
    public class UpdateAddressDto
    {
        [MaxLength(64)]
        [MinLength(1)]
        [RegularExpression(@"^[a-zA-Z]+\-?[a-zA-Z]+$")]  // Accepts upper and lower case letters and one hyphen
        public string? City { get; set; }

        [MaxLength(64)]
        [MinLength(1)]
        [RegularExpression(@"^[a-zA-Z]+(\s?[a-zA-Z]+)*$")] //Accepts upper and lower case letters and spaces
        public string? Street { get; set; }

        [MaxLength(64)]
        [MinLength(1)]
        [RegularExpression(@"\d{2}-\d{3}")]
        public string? PostalCode { get; set; }

        [Range(1, 5000)]
        public int? Number { get; set; }

        public County? County { get; set; }
    }
}
