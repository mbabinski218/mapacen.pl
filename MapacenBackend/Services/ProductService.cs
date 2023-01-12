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
        Product CreateProduct(CreateProductDto dto);
        void UpdateProduct(int id, UpdateProductDto dto);
        IEnumerable<ProductDto>? GetAllProducts();
        void DeleteProduct(int id);
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
            if (_dbContext.Products.Any(p => p.Name == dto.Name))
                throw new NotUniqueElementException("Produkt o podanej nazwie już istnieje");

            var product = _mapper.Map<Product>(dto);

            _dbContext.Products.Add(product);
            _dbContext.SaveChanges();

            return product;
        }

        public void DeleteProduct(int id)
        {
            var product = _dbContext
                .Products
                .FirstOrDefault(p => p.Id == id)
                ?? throw new NotFoundException("Produkt nie istnieje");

            _dbContext.Remove(product);
            _dbContext.SaveChanges();
        }

        public IEnumerable<ProductDto>? GetAllProducts()
        {
            var products = _dbContext.Products.Include(p => p.Category).OrderBy(p => p.Name);
            return _mapper.Map<IEnumerable<ProductDto>>(products);
        }


        public void UpdateProduct(int id, UpdateProductDto dto)
        {
            var product = _dbContext.Products.FirstOrDefault(c => c.Id == id);
            if (product == null) throw new NotFoundException("Wybrany produkt nie istnieje");

            product.Name = dto?.Name ?? product.Name;
            product.CategoryId = dto?.CategoryId ?? product.CategoryId;

            _dbContext.SaveChanges();
        }

    }

}

