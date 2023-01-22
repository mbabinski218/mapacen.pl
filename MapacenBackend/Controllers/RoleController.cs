using MapacenBackend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MapacenBackend.Controllers
{
    [Route("api/role")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        readonly MapacenDbContext _dbContext;

        public RoleController(MapacenDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("{id}")]
        public ActionResult<Role> GetRole([FromRoute] int id)
        {
            return Ok(_dbContext.Roles.FirstOrDefault(r => r.Id == id));
        }

        [HttpGet]
        public ActionResult<IEnumerable<Role>> GetAll()
        {
            return Ok(_dbContext.Roles);
        }
    }
}
