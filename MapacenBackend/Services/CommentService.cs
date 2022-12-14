using MapacenBackend.Entities;
using MapacenBackend.Models.CommentDtos;

namespace MapacenBackend.Services
{
    public interface ICommentService
    {
        int CreateComment(CreateCommentDto dto);
    }

    public class CommentService : ICommentService
    {
        private readonly MapacenDbContext _dbContext;

        public CommentService(MapacenDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public int CreateComment(CreateCommentDto dto)
        {
            var comment = new Comment
            {
                Content = dto.Content,
                UserId = dto.UserId,
                OfferId = dto.OfferId
            };

            _dbContext.Add(comment);
            _dbContext.SaveChanges();

            return comment.Id;
        }

        //TODO likowanie i dislikowanie
    }
}
