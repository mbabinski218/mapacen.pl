using AutoMapper;
using MapacenBackend.Entities;
using MapacenBackend.Exceptions;
using MapacenBackend.Models.CommentDtos;

namespace MapacenBackend.Services
{
    public interface ICommentService
    {
        public int CreateComment(CreateCommentDto dto);
        public void LikeComment(int commentId);
        public void DislikeComment(int commentId);
    }

    public class CommentService : ICommentService
    {
        private readonly MapacenDbContext _dbContext;
        private readonly IMapper _mapper;

        public CommentService(MapacenDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public int CreateComment(CreateCommentDto dto)
        {
            var comment = _mapper.Map<Comment>(dto);

            _dbContext.Add(comment);
            _dbContext.SaveChanges();

            return comment.Id;
        }

        public void LikeComment(int commentId)
        {
            var comment = _dbContext
                .Comments
                .FirstOrDefault(c => c.Id == commentId)
                ?? throw new NotFoundException("Comment with requested id does not exist");

            comment.Likes++;
            _dbContext.SaveChanges();
        }

        public void DislikeComment(int commentId)
        {
            var comment = _dbContext
                .Comments
                .FirstOrDefault(c => c.Id == commentId) 
                ?? throw new NotFoundException("Comment with requested id does not exist");

            comment.Dislikes++;
            _dbContext.SaveChanges();
        }
    }
}
