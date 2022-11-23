using MapacenBackend.Entities;
using MapacenBackend.Models.CategoryDtos;

namespace MapacenBackend.Models.ProductDtos
{
    public class ProductDto
    {
        public string Name { get; set; }
        public CategoryDto Category { get; set; }
    }
}
