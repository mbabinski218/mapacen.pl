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
        IEnumerable<CommentDto>? GetAllComments(int offerId);
        IEnumerable<OfferDto>? GetOffers(int countyId, string productName, int? categoryId);
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

        public IEnumerable<OfferDto>? GetOffers(int countyId, string productName, int? categoryId)
        {
            return categoryId == null
                ? GetOffersByProductName(countyId, productName)
                : GetOffersByProductNameAndCategory(countyId, productName, (int)categoryId);
        }

        private IEnumerable<OfferDto>? GetOffersByProductName(int countyId, string productName)
        {
            return _dbContext
                .Offers
                .Include(o => o.Product)
                .Include(o => o.SalesPoint)
                    .ThenInclude(s => s.Address)
                .Where(o => o.SalesPoint.Address.CountyId == countyId)
                .Where(o => EF.Functions
                    .Like(o.Product.Name, $"%{productName}%"))
                    .Select(o => _mapper.Map<OfferDto>(o));
        }

        private IEnumerable<OfferDto>? GetOffersByProductNameAndCategory(int countyId, string productName, int categoryId)
        {
            return _dbContext
                .Offers
                .Include(o => o.Product)
                .Include(o => o.SalesPoint)
                    .ThenInclude(s => s.Address)
                .Where(o => o.SalesPoint.Address.CountyId == countyId)
                .Where(o => o.Product.CategoryId == categoryId)
                .Where(o => EF.Functions
                    .Like(o.Product.Name, $"%{productName}%"))
                    .Select(o => _mapper.Map<OfferDto>(o));
        }

        public IEnumerable<CommentDto>? GetAllComments(int offerId)
        {
            return _dbContext
                .Comments
                .Where(c => c.OfferId == offerId)
                .Include(c => c.User)
                .Select(c => _mapper.Map<CommentDto>(c));

            //return _dbContext
            //    .Offers
            //    .Where(o => o.Id == offerId)
            //    .Include(o => o.Comments)
            //    .Select(o => o.Comments)
            //    .Select(lc => lc.ForEach(l => ))
            //    .Select(c => new CommentDto
            //    {
            //        Author = c.User.Name,
            //        Likes = c.Likes,
            //        DisLikes = c.Dislikes,
            //        Content = c.Content
            //    });
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
