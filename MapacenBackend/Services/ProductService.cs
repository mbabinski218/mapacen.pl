﻿using MapacenBackend.Entities;
using MapacenBackend.Models.CategoryDtos;
using MapacenBackend.Models.ProductDtos;
using Microsoft.EntityFrameworkCore;

namespace MapacenBackend.Services
{
    public interface IProductService
    {
        IEnumerable<ProductDto>? GetProductsByCategory(CategoryDto category);
        Product? GetProductById(int id);
        Product CreateProduct(CreateProductDto dto);
        void UpdateProduct(int id, UpdateProductDto dto);
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
            foreach (var product in GetProductByCategory(dto)?.Products)
            {
                products.Add(new ProductDto { Name = product.Name, Category = dto });
            }

            return products.ToList();
        }

        private Category? GetProductByCategory(CategoryDto category)
        {
            return _dbContext
                .Categories
                .Include(p => p.Products)
                .FirstOrDefault(p => p.Id == category.Id);
        }

        public Product? GetProductById(int id)
        {
            throw new NotImplementedException();
        }

        public void UpdateProduct(int id, UpdateProductDto dto)
        {
            throw new NotImplementedException();
        }
    }

}

