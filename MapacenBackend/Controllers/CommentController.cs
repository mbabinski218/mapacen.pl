using MapacenBackend.Models.CommentDtos;
using MapacenBackend.Services;
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
            return Created($"/api/comment/{commentId}", commentId);
        }

        [HttpPut("like/{commentId}/{userId}")]
        public ActionResult LikeComment([FromRoute] int commentId, [FromRoute] int userId)
        {
            _service.LikeComment(commentId, userId);
            return Ok();
        }

        [HttpPut("dislike/{commentId}/{userId}")]
        public ActionResult DislikeComment([FromRoute] int commentId, [FromRoute] int userId)
        {
            _service.DislikeComment(commentId, userId);
            return Ok();
        }
    }
}
