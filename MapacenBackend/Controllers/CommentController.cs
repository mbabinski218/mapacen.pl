using MapacenBackend.Models.CommentDtos;
using MapacenBackend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MapacenBackend.Controllers
{
    [Route("api/comment")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _service;

        public CommentController(ICommentService service)
        {
            _service = service;
        }

        [HttpPost]
        public ActionResult<int> CreateComment([FromBody] CreateCommentDto dto)
        {
            var commentId = _service.CreateComment(dto);
            return Created($"/api/comment/{commentId}", null);
        }
    }
}
