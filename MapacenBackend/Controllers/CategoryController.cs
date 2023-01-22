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
        //[Authorize(Roles = "Service Administrator, Local Administrator, User")]
        public ActionResult<IEnumerable<CategoryDto>> GetCategories()
        {
            return Ok(_service.GetCategories());
        }

        [HttpGet("{id}")]
        //[Authorize(Roles = "Service Administrator, Local Administrator, User")]
        public ActionResult<CategoryDto> GetCategoryById([FromRoute] int id)
        {
            return Ok(_service.GetCategoryById(id));
        }

        [HttpPost]
        //[Authorize(Roles = "Service Administrator")]
        public ActionResult<int> CreateCategory([FromBody] CreateCategoryDto dto)
        {
            var categoryId = _service.CreateCategory(dto);
            return Created($"/api/category/{categoryId}", categoryId);
        }

        [HttpPut("{id}")]
        //[Authorize(Roles = "Service Administrator")]
        public ActionResult<int> Update([FromBody] UpdateCategoryDto dto, [FromRoute] int id)
        {
            return Ok(_service.UpdateCategory(id, dto));
        }

        [HttpDelete("{id}")]
        public ActionResult Delete([FromRoute] int id)
        {
            _service.DeleteCategory(id);
            return Ok();
        }
    }
}
