using MapacenBackend.Entities;
using MapacenBackend.Models.CategoryDtos;
using MapacenBackend.Services;
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
        public ActionResult<IEnumerable<CategoryDto>> GetCategories()
        {
            return Ok(_service.GetCategories());
        }

        [HttpGet("{id}")]
        public ActionResult<CategoryDto> GetCategoryById([FromRoute] int id)
        {
            return Ok(_service.GetCategoryById(id));
        }

        [HttpPost]
        public ActionResult<Category> CreateCategory([FromBody] CreateCategoryDto dto)
        {
            var category = _service.CreateCategory(dto);
            return Created($"/api/category/{category.Id}", category);
        }

        [HttpPut("{id}")]
        public ActionResult Update([FromBody] UpdateCategoryDto dto, [FromRoute] int id)
        {
            _service.UpdateCategory(id, dto);
            return Ok();
        }
    }
}
