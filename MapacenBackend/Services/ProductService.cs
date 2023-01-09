﻿using AutoMapper;
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

        public IEnumerable<ProductDto>? GetAllProducts()
        {
            var products = _dbContext.Products.OrderBy(p => p.Name);
            return _mapper.Map<IEnumerable<ProductDto>>(products);
        }

        private Category? GetProductCategory(CategoryDto category)
        {
            return _dbContext
                .Categories
                .Include(c => c.Products)
                .FirstOrDefault(c => c.Id == category.Id);
        }

        public void UpdateProduct(int id, UpdateProductDto dto)
        {
            var product = _dbContext.Products.FirstOrDefault(c => c.Id == id);
            if (product == null) throw new NotFoundException("Product with requested id does not exist");

            product.Name = dto?.Name ?? product.Name;
            product.CategoryId = dto?.CategoryId ?? product.CategoryId;

            _dbContext.SaveChanges();
        }

    }

}
