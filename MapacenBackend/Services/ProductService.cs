using AutoMapper;
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
        private readonly IMapper _mapper;

        public ProductService(MapacenDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public Product CreateProduct(CreateProductDto dto)
        {
            //TODO not found exception
            var product = _mapper.Map<Product>(dto);

            _dbContext.Products.Add(product);
            _dbContext.SaveChanges();

            return product;
        }

        public IEnumerable<ProductDto>? GetProductsByCategory(CategoryDto dto)
        {
            var category = GetProductCategory(dto);

            if (category == null)
                throw new NotFoundException("Requested category does not exist");

            return category
                .Products
                .Select(product => _mapper.Map<ProductDto>(product));
        }

        private Category? GetProductCategory(CategoryDto category)
        {
            return _dbContext
                .Categories
                .Include(c => c.Products)
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
                .Select(p => _mapper.Map<ProductDto>(p));
        }

    }

}

