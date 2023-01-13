using MapacenBackend.Models;
using MapacenBackend.Models.UserDtos;
using MapacenBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace MapacenBackend.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;

        public UserController(IUserService service)
        {
            _service = service;
        }

        [HttpPost("register")]
        public ActionResult Register([FromBody] CreateUserDto dto)
        {
            _service.RegisterUser(dto);
            return Ok();
        }

        [HttpPost("login")]
        public ActionResult<TokenToReturn> Login([FromBody] LoginUserDto dto)
        {
            return Ok(_service.LoginUser(dto));
        }

        [HttpPost("refreshToken")]
        public ActionResult<string> RefreshToken([FromBody] LoginUserDto dto)
        {
            var user = _service.GetUser(dto);
            var refreshToken = Request.Cookies["refreshToken"];

            if (!user.RefreshToken.Equals(refreshToken))
            {
                return Unauthorized("Invalid Refresh Token.");
            }

            if (user.TokenExpires < DateTime.Now)
            {
                return Unauthorized("Token expired.");
            }

            return Ok(_service.GenerateNewTokensForUser(user));
        }

        [HttpPost("userCounty/{userId}/{countyId}")]
        public ActionResult ChangeUserCounty([FromRoute] int userId, [FromRoute] int countyId)
        {
            _service.ChangeUserCounty(userId, countyId);
            return Ok();
        }

        [HttpGet("{id}")]
        public ActionResult<UserDto> GetUser([FromRoute] int id)
        {
            return Ok(_service.GetUser(id));
        }

        [HttpGet]
        public ActionResult<IEnumerable<UserDto>>? GetAllUsers()
        {
            return Ok(_service.GetAllUsers());
        }

        [HttpPut("ban/{id}")]
        public ActionResult BanUser([FromRoute] int id)
        {
            _service.BanUser(id);
            return Ok();
        }

        [HttpPut("unban/{id}")]
        public ActionResult UnbanUser([FromRoute] int id)
        {
            _service.UnbanUser(id);
            return Ok();
        }
    }
}