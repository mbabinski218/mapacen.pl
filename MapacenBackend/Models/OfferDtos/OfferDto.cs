using MapacenBackend.Entities;
using MapacenBackend.Models.CommentDtos;
using MapacenBackend.Models.ProductDtos;
using MapacenBackend.Models.SalesPointDtos;

namespace MapacenBackend.Models.OfferDtos
{
    public class OfferDto
    {
        public decimal Price { get; set; }
        public ProductDto Product { get; set; }
        public SalesPointDto SalesPoint { get; set; }
        public List<CommentDto> Comments { get; set; }
    }
}
