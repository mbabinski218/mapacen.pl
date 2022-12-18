using AutoMapper;
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

        //TODO likowanie i dislikowanie
    }
}
