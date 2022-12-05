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
        public ActionResult<string> Login([FromBody] UserDto dto)
        {
            return Ok(_service.LoginUser(dto));
        }
        
        [HttpPost("refreshToken")]
        public ActionResult<string> RefreshToken([FromBody] UserDto dto)
        {
            var user = _service.GetUser(dto);
            var refreshToken = Request.Cookies["refreshToken"];

            if (!user.RefreshToken.Equals(refreshToken))
            {
                return Unauthorized("Invalid Refresh Token.");
            }
            
            if(user.TokenExpires < DateTime.Now)
            {
                return Unauthorized("Token expired.");
            }
            
            return Ok(_service.GenerateNewTokensForUser(user));
        }
    }
}