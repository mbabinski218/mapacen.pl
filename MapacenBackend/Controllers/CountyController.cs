using MapacenBackend.Entities;
using MapacenBackend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MapacenBackend.Controllers
{
    [Route("api/county")]
    [ApiController]
    public class CountyController : ControllerBase
    {
        readonly MapacenDbContext _dbContext;

        public CountyController(MapacenDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public ActionResult<IEnumerable<CountyDto>> GetAll()
        {
            return Ok(_dbContext.Counties.OrderBy(c => c.Name));
        }

        [HttpGet("{id}")]
        public ActionResult<CountyDto> Get([FromRoute] int id)
        {
            return Ok(_dbContext.Counties.FirstOrDefault(c => c.Id == id));
        }
    }
}
