using MapacenBackend.Entities;

namespace MapacenBackend.Models.CommentDtos
{
    public class CommentDto
    {
        public int Likes { get; set; }
        public int DisLikes { get; set; }
        public string Content { get; set; }
        public string Author { get; set; }
    }
}
