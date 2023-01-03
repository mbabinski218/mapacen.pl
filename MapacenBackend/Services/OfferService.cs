using AutoMapper;
using MapacenBackend.Entities;
using MapacenBackend.Exceptions;
using MapacenBackend.Models.AddressDtos;
using MapacenBackend.Models.CategoryDtos;
using MapacenBackend.Models.CommentDtos;
using MapacenBackend.Models.OfferDtos;
using MapacenBackend.Models.ProductDtos;
using MapacenBackend.Models.SalesPointDtos;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata.Ecma335;

namespace MapacenBackend.Services
{
    public interface IOfferService
    {
        public int AddOffer(CreateOfferDto dto);
        void AddOfferToFavourites(int offerId, int favoritesId);
        IEnumerable<CommentDto>? GetAllComments(int offerId);
        IEnumerable<OfferDto>? GetFavouritesOffers(int favouritesId);
        OffersWithTotalCount GetOffers(int countyId, string? productName, int? categoryId, int pageSize, int pageNumber);
        void UpdateOffer(int id, UpdateOfferDto dt);
    }

    public class OfferService : IOfferService
    {
        private readonly MapacenDbContext _dbContext;
        private readonly IMapper _mapper;

        public OfferService(MapacenDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public int AddOffer(CreateOfferDto dto)
        {
            if (GetProductById(dto.ProductId) == null || GetSalesPointById(dto.SalesPointId) == null)
                throw new InvalidOperationException("Fatal error");

            var offer = _mapper.Map<Offer>(dto);

            _dbContext.Offers.Add(offer);
            _dbContext.SaveChanges();
            return offer.Id;
        }

        public OffersWithTotalCount GetOffers(int countyId, string? productName, int? categoryId, int pageSize, int pageNumber)
        {
            return categoryId == null
                ? GetOffersByProductName(countyId, productName ?? "", pageSize, pageNumber)
                : GetOffersByProductNameAndCategory(countyId, productName ?? "", categoryId.Value, pageSize, pageNumber);
        }

        private OffersWithTotalCount GetOffersByProductName(int countyId, string productName, int pageSize, int pageNumber)
        {
            var offers = _dbContext
                .Offers
                .Include(o => o.Product)
                    .ThenInclude(p => p.Category)
                .Include(o => o.SalesPoint)
                    .ThenInclude(s => s.Address)
                        .ThenInclude(a => a.County)
                .Where(o => o.SalesPoint.Address.CountyId == countyId)
                .Where(o => EF.Functions
                    .Like(o.Product.Name, $"%{productName}%"));

            var count = offers.Count();

            offers.Skip(pageSize * (pageNumber - 1))
            .Take(pageSize);

            var offersDto = _mapper.Map<List<OfferDto>>(offers);

            return new OffersWithTotalCount { Count = count, Offers = offersDto };

        }

        private OffersWithTotalCount GetOffersByProductNameAndCategory(int countyId, string productName, int categoryId, int pageSize, int pageNumber)
        {
            var offers = _dbContext
                .Offers
                .Include(o => o.Product)
                    .ThenInclude(p => p.Category)
                .Include(o => o.SalesPoint)
                    .ThenInclude(s => s.Address)
                        .ThenInclude(a => a.County)
                .Where(o => o.SalesPoint.Address.CountyId == countyId)
                .Where(o => o.Product.CategoryId == categoryId)
                .Where(o => EF.Functions
                    .Like(o.Product.Name, $"%{productName}%"));

            var count = offers.Count();

            offers.Skip(pageSize * (pageNumber - 1))
            .Take(pageSize)
            .ToList();

            var offersDto = _mapper.Map<List<OfferDto>>(offers);
            return new OffersWithTotalCount { Count = count, Offers = offersDto };
        }

        public IEnumerable<CommentDto>? GetAllComments(int offerId)
        {
            return _dbContext
                .Comments
                .Where(c => c.OfferId == offerId)
                .Include(c => c.User)
                .Select(c => _mapper.Map<CommentDto>(c));
        }

        public void AddOfferToFavourites(int offerId, int favoritesId)
        {
            _dbContext.FavouritesOffer.Add(
                new FavouritesOffer
                {
                    FavouritesId = _dbContext.Favourites.FirstOrDefault(f => f.Id == favoritesId).Id,
                    OfferId = GetOfferById(offerId).Id
                });

            _dbContext.SaveChanges();
        }

        public IEnumerable<OfferDto>? GetFavouritesOffers(int favouritesId)
        {
            //var offers = _dbContext
            //    .Favourites
            //    .Where(f => f.Id == favouritesId)
            //    .Include(f => f.FavouritesOffer)
            //    .ThenInclude(f => f.Offer)
            //    .Select(f => f.);

            var offers = _dbContext
                .FavouritesOffer
                .Where(fo => fo.FavouritesId == favouritesId)
                .Include(fo => fo.Offer)
                .ThenInclude(o => o.Product)
                .ThenInclude(p => p.Category)
                .Include(fo => fo.Offer.SalesPoint)
                .ThenInclude(s => s.Address)
                .ThenInclude(a => a.County)
                .Select(fo => fo.Offer)
                .ToList();

            return _mapper.Map<List<OfferDto>>(offers);

        }

        public void UpdateOffer(int id, UpdateOfferDto dto)
        {
            if (dto != null)
            {
                var offer = GetOfferById(id);
                offer.Price = dto?.Price ?? offer.Price;
                _dbContext.SaveChanges();
            }
        }

        private Offer GetOfferById(int id)
        {
            var offer = _dbContext
                .Offers
                .FirstOrDefault(o => o.Id == id);
            if (offer == null) throw new NotFoundException("Offer with requested id does not exist");
            return offer;
        }

        private Product GetProductById(int id)
        {
            var product = _dbContext
                .Products
                .FirstOrDefault(p => p.Id == id);

            if (product == null)
                throw new NotFoundException("Product with requested id does not exist");
            return product;
        }

        private SalesPoint GetSalesPointById(int id)
        {
            var salesPoint = _dbContext.SalesPoints
                .FirstOrDefault(s => s.Id == id);

            if (salesPoint == null)
                throw new NotFoundException("SalesPoint with requested id does not exist");
            return salesPoint;
        }

    }
}
