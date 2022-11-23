using System.ComponentModel.DataAnnotations;

namespace MapacenBackend.Models.CommentDtos
{
    public class UpdateCommentDto
    {
        [MaxLength(250)]
        [MinLength(1)]
        public string? Content { get; set; }
    }
}
