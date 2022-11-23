using MapacenBackend.Entities;

namespace MapacenBackend.Models.CommentDtos
{
    public class CommentDto
    {
        public int Rating { get; set; }
        public string Content { get; set; }
        public string Author { get; set; }
    }
}
