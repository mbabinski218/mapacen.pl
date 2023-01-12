using AutoMapper;
using MapacenBackend.Entities;
using MapacenBackend.Exceptions;
using MapacenBackend.Models.CommentDtos;
using Microsoft.EntityFrameworkCore;

namespace MapacenBackend.Services
{
    public interface ICommentService
    {
        public int CreateComment(CreateCommentDto dto);
        public void LikeComment(int commentId, int userId);
        public void DislikeComment(int commentId, int userId);
        public void DeleteComment(int commentId);
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
            var user = _dbContext
                .Users
                .FirstOrDefault(u => u.Id == dto.UserId) ?? throw new NotFoundException("Użytkownik nie istnieje");

            if (!user.CanComment) throw new IllegalOperationException("Użytkownik nie może komentować");

            var comment = _mapper.Map<Comment>(dto);

            _dbContext.Add(comment);
            _dbContext.SaveChanges();

            return comment.Id;
        }

        public void DeleteComment(int commentId)
        {
            var comment = _dbContext
                .Comments
                .Include(c => c.Likers)
                .Include(c => c.Dislikers)
                .FirstOrDefault(c => c.Id == commentId)
                ?? throw new NotFoundException("Komentarz nie istnieje");

            _dbContext.Remove(comment);
            _dbContext.SaveChanges();
        }

        public void LikeComment(int commentId, int userId)
        {
            var foundUser = _dbContext
                .Users
                .FirstOrDefault(u => u.Id == userId)
                ?? throw new NotFoundException("Użytkownik nie istnieje");

            var comment = _dbContext
                .Comments
                .FirstOrDefault(c => c.Id == commentId)
                ?? throw new NotFoundException("Komentarz nie istnieje");

            if (!foundUser.CanComment) throw new IllegalOperationException("Użytkownik nie może komentować");

            var user = GetLiker(commentId, userId);

            if (user != null)
            {
                comment.Likers!.Remove(user);
                comment.Likes--;
            }

            else
            {
                var disliker = GetDisliker(commentId, userId);
                if (disliker != null)
                {
                    comment.Dislikers!.Remove(disliker);
                    comment.Dislikes--;
                }

                _dbContext.Likers.Add(
                    new Likers
                    {
                        UserId = userId,
                        CommentId = commentId
                    });

                comment.Likes++;
            }
            _dbContext.SaveChanges();
        }

        public void DislikeComment(int commentId, int userId)
        {
            var foundUser = _dbContext
                .Users
                .FirstOrDefault(u => u.Id == userId)
                ?? throw new NotFoundException("Użytkownik nie istnieje");

            var comment = _dbContext
                .Comments
                .FirstOrDefault(c => c.Id == commentId)
                ?? throw new NotFoundException("Komentarz nie istnieje");

            if (!foundUser.CanComment) throw new IllegalOperationException("Użytkownik nie może komentować");

            var user = GetDisliker(commentId, userId);

            if (user != null)
            {
                comment.Dislikers!.Remove(user);
                comment.Dislikes--;
            }

            else
            {
                var liker = GetLiker(commentId, userId);
                if (liker != null)
                {
                    comment.Likers!.Remove(liker);
                    comment.Likes--;
                }

                _dbContext.Dislikers.Add(
                    new Dislikers
                    {
                        UserId = userId,
                        CommentId = commentId
                    });

                comment.Dislikes++;
            }
            _dbContext.SaveChanges();
        }


        private Likers? GetLiker(int commentId, int userId)
        {
            return _dbContext
                 .Likers
                 .Where(l => l.CommentId == commentId)
                 .Include(l => l.User)
                 .FirstOrDefault(l => l.UserId == userId);
        }

        private Dislikers? GetDisliker(int commentId, int userId)
        {
            return _dbContext
                 .Dislikers
                 .Where(l => l.CommentId == commentId)
                 .Include(l => l.User)
                 .FirstOrDefault(l => l.UserId == userId);
        }
    }
}
