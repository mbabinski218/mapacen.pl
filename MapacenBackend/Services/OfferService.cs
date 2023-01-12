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
using System.Linq;
using System.Reflection.Metadata.Ecma335;

namespace MapacenBackend.Services
{
    public interface IOfferService
    {
        int AddOffer(CreateOfferDto dto);
        void AddOfferToFavourites(int offerId, int userId);
        IEnumerable<CommentDto>? GetAllComments(int offerId);
        IEnumerable<CommentDto>? GetAllComments(int offerId, int userId);
        OffersWithTotalCount GetFavouritesOffers(int userId, int pageSize, int pageNumber);
        OffersWithTotalCount GetOffers(int countyId, string? productName, int? categoryId, int? pageSize, int? pageNumber);
        void UpdateOffer(int id, UpdateOfferDto dt);
        void DeleteOffer(int id);
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

        public OffersWithTotalCount GetOffers(int countyId, string? productName, int? categoryId, int? pageSize, int? pageNumber)
        {
            return categoryId == null
                ? GetOffersByProductName(countyId, productName ?? "", pageSize, pageNumber)
                : GetOffersByProductNameAndCategory(countyId, productName ?? "", categoryId.Value, pageSize, pageNumber);
        }

        private OffersWithTotalCount GetOffersByProductName(int countyId, string productName, int? pageSize, int? pageNumber)
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

            if (pageSize.HasValue && pageNumber.HasValue)
                offers = offers.Skip(pageSize.Value * (pageNumber.Value - 1)).Take(pageSize.Value);


            var offersDto = _mapper.Map<List<OfferDto>>(offers);

            return new OffersWithTotalCount { Count = count, Offers = offersDto };

        }

        private OffersWithTotalCount GetOffersByProductNameAndCategory(int countyId, string productName, int categoryId, int? pageSize, int? pageNumber)
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

            if (pageSize.HasValue && pageNumber.HasValue)
                offers = offers.Skip(pageSize.Value * (pageNumber.Value - 1)).Take(pageSize.Value);

            var offersDto = _mapper.Map<List<OfferDto>>(offers);
            return new OffersWithTotalCount { Count = count, Offers = offersDto };
        }

        public IEnumerable<CommentDto>? GetAllComments(int offerId, int userId)
        {
            var comments = _dbContext
                .Comments
                .Where(c => c.OfferId == offerId)
                .OrderByDescending(c => c.CreationDate)
                .Include(c => c.User);

            var commentsDto = _mapper.Map<List<CommentDto>>(comments);
            foreach (var c in commentsDto)
            {
                var liker = _dbContext
                .Likers
                .Where(l => l.CommentId == c.Id)
                .FirstOrDefault(l => l.UserId == userId);

                Dislikers? disliker = null;
                if (liker == null)
                {
                    disliker = _dbContext
                    .Dislikers
                    .Where(l => l.CommentId == c.Id)
                    .FirstOrDefault(l => l.UserId == userId);
                }

                c.IsLikedOrDislikedByUser = liker == null ? (disliker == null ? null : false) : true;
                yield return c;
            };
        }

        public IEnumerable<CommentDto>? GetAllComments(int offerId)
        {
            var comments = _dbContext
                .Comments
                .Where(c => c.OfferId == offerId)
                .OrderByDescending(c => c.CreationDate)
                .Include(c => c.User);

            return _mapper.Map<List<CommentDto>>(comments);
        }

        public void AddOfferToFavourites(int offerId, int userId)
        {
            var user = _dbContext.Users.FirstOrDefault(f => f.Id == userId)
                ?? throw new NotFoundException("Użytkownik nie istnieje");

            var offer = GetOfferById(offerId);

            _dbContext.Favourites.Add(
                new UserOffer
                {
                    UserId = user.Id,
                    OfferId = offer.Id
                });

            _dbContext.SaveChanges();
        }

        public OffersWithTotalCount GetFavouritesOffers(int userId, int pageSize, int pageNumber)
        {
            var offers = _dbContext
                .Favourites
                .Where(uo => uo.UserId == userId)
                .Include(uo => uo.Offer)
                    .ThenInclude(o => o.Product)
                        .ThenInclude(p => p.Category)
                .Include(uo => uo.Offer.SalesPoint)
                    .ThenInclude(s => s.Address)
                        .ThenInclude(a => a.County)
                .Select(uo => uo.Offer);

            var count = offers.Count();

            offers = offers.Skip(pageSize * (pageNumber - 1)).Take(pageSize);

            var offersDto = _mapper.Map<List<OfferDto>>(offers);

            return new OffersWithTotalCount { Count = count, Offers = offersDto };

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
            if (offer == null) throw new NotFoundException("Wybrana oferta nie istnieje");
            return offer;
        }

        private Product GetProductById(int id)
        {
            var product = _dbContext
                .Products
                .FirstOrDefault(p => p.Id == id);

            if (product == null)
                throw new NotFoundException("Wybrany produkt nie istnieje");
            return product;
        }

        private SalesPoint GetSalesPointById(int id)
        {
            var salesPoint = _dbContext.SalesPoints
                .FirstOrDefault(s => s.Id == id);

            if (salesPoint == null)
                throw new NotFoundException("Wybrany punkt sprzedaży nie istnieje");
            return salesPoint;
        }

        public void DeleteOffer(int id)
        {
            var offer = _dbContext
                .Offers
                .FirstOrDefault(u => u.Id == id)
                ?? throw new NotFoundException("Produkt nie istnieje");

            _dbContext.Remove(offer);
            _dbContext.SaveChanges();
        }
    }
}
