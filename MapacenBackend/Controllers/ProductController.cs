using MapacenBackend.Entities;
using MapacenBackend.Models.CategoryDtos;
using MapacenBackend.Models.ProductDtos;
using MapacenBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;

namespace MapacenBackend.Controllers
{
    [Route("api/product")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _service;

        public ProductController(IProductService service)
        {
            _service = service;
        }

        [HttpPost]
        //[Authorize(Roles = "Service Administrator, Local Administrator")]
        public ActionResult<Product> CreateProduct([FromBody] CreateProductDto dto)
        {
            var product = _service.CreateProduct(dto);
            return Created($"/api/product/{product.Id}", product);
        }

        [HttpGet]
        [Authorize(Roles = "Service Administrator, Local Administrator, User")]
        public ActionResult<IEnumerable<ProductDto>?> GetProductsByCategory([FromQuery] CategoryDto category)
        {
            return Ok(_service.GetProductsByCategory(category));
        }

        [HttpPut("{id}")]
        //[Authorize(Roles = "Service Administrator, Local Administrator")]
        public ActionResult Update([FromBody] UpdateProductDto dto, [FromRoute] int id)
        {
            _service.UpdateProduct(id, dto);
            return Ok();
        }

        [HttpGet("{name}")]
        public ActionResult<IEnumerable<ProductDto>?> GetProductsByName([FromRoute] string name)
        {
            return Ok(_service.GetProductsByName(name));
        }
    }
}
