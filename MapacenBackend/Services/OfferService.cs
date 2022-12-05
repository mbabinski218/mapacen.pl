using MapacenBackend.Entities;

namespace MapacenBackend.Services
{
    public interface IOfferService
    {

    }

    public class OfferService : IOfferService
    {
        private readonly MapacenDbContext _dbContext;

        public OfferService(MapacenDbContext dbContext)
        {
            _dbContext = dbContext;
        }
    }
}
