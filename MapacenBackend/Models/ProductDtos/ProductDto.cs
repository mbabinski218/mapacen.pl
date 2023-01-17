using MapacenBackend.Entities;
using MapacenBackend.Models.CategoryDtos;

namespace MapacenBackend.Models.ProductDtos
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public CategoryDto Category { get; set; }
        public string ImageName { get; set; }
    }
}
