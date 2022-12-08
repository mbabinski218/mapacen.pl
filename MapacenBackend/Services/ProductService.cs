using MapacenBackend.Entities;
using MapacenBackend.Exceptions;
using MapacenBackend.Models.CategoryDtos;
using MapacenBackend.Models.ProductDtos;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;

namespace MapacenBackend.Services
{
    public interface IProductService
    {
        IEnumerable<ProductDto>? GetProductsByCategory(CategoryDto category);
        Product? GetProductById(int id);
        Product CreateProduct(CreateProductDto dto);
        void UpdateProduct(int id, UpdateProductDto dto);
        IEnumerable<ProductDto>? GetProductsByName(string name);
    }

    public class ProductService : IProductService
    {
        private readonly MapacenDbContext _dbContext;

        public ProductService(MapacenDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Product CreateProduct(CreateProductDto dto)
        {
            var product = new Product
            {
                Name = dto.Name,
                CategoryId = dto.CategoryId
            };
            _dbContext.Products.Add(product);
            _dbContext.SaveChanges();

            return product;
        }

        public IEnumerable<ProductDto>? GetProductsByCategory(CategoryDto dto)
        {
            var products = new List<ProductDto>();
            var category = GetProductCategory(dto);

            if (category == null) throw new NotFoundException("Requested category does not exist");

            foreach (var product in category.Products)
            {
                products.Add(new ProductDto
                {
                    Name = product.Name,
                    Category = new CategoryDto
                    {
                        Id = category.Id,
                        Name = category.Name
                    }
                });
            }

            return products;
        }

        private Category? GetProductCategory(CategoryDto category)
        {
            return _dbContext
                .Categories
                .Include(p => p.Products)
                .FirstOrDefault(c => c.Id == category.Id);
        }

        public Product? GetProductById(int id)
        {
            throw new NotImplementedException();
        }

        public void UpdateProduct(int id, UpdateProductDto dto)
        {
            var product = _dbContext.Products.FirstOrDefault(c => c.Id == id);
            if (product == null) throw new NotFoundException("Product with requested id does not exist");

            product.Name = dto?.Name ?? product.Name;
            product.CategoryId = dto?.CategoryId ?? product.CategoryId;

            _dbContext.SaveChanges();
        }

        public IEnumerable<ProductDto>? GetProductsByName(string name)
        {
            return _dbContext.
                Products
                .Where(p => EF
                .Functions
                .Like(p.Name, $"%{name}%"))
                .Select(p => new ProductDto
                {
                    Name = p.Name,
                    Category = new CategoryDto
                    {
                        Id = p.Category.Id,
                        Name = p.Category.Name
                    }
                });
        }
    }

}

