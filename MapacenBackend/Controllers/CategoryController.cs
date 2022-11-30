using MapacenBackend.Entities;
using MapacenBackend.Models.CategoryDtos;
using MapacenBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MapacenBackend.Controllers
{
    [Route("api/category")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _service;

        public CategoryController(ICategoryService service)
        {
            _service = service;
        }

        [HttpGet]
        [Authorize(Roles = "Service Administrator, Local Administrator, User")]
        public ActionResult<IEnumerable<CategoryDto>> GetCategories()
        {
            return Ok(_service.GetCategories());
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Service Administrator, Local Administrator, User")]
        public ActionResult<CategoryDto> GetCategoryById([FromRoute] int id)
        {
            return Ok(_service.GetCategoryById(id));
        }

        [HttpPost]
        [Authorize(Roles = "Service Administrator")]
        public ActionResult<CategoryDto> CreateCategory([FromBody] CreateCategoryDto dto)
        {
            var category = _service.CreateCategory(dto);
            return Created($"/api/category/{category.Id}", category);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Service Administrator")]
        public ActionResult Update([FromBody] UpdateCategoryDto dto, [FromRoute] int id)
        {
            _service.UpdateCategory(id, dto);
            return Ok();
        }
    }
}
