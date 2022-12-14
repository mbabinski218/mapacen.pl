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

        public OfferService(MapacenDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public int AddOffer(CreateOfferDto dto)
        {
            if (GetProductById(dto.ProductId) != null
                && GetSalesPointById(dto.SalesPointId) != null)
            {
                var offer = new Offer
                {
                    Price = dto.Price,
                    ProductId = dto.ProductId,
                    SalesPointId = dto.SalesPointId,
                };

                _dbContext.Offers.Add(offer);
                _dbContext.SaveChanges();
                return offer.Id;
            }
            throw new InvalidOperationException("Fatal error");
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
                    .Select(o => new OfferDto
                    {
                        Id = o.Id,
                        Price = o.Price,
                        Product = new ProductDto
                        {
                            Name = o.Product.Name,
                            Category = new CategoryDto
                            {
                                Id = o.Product.CategoryId,
                                Name = o.Product.Category.Name,
                            }
                        },
                        SalesPoint = new SalesPointDto
                        {
                            Id = o.SalesPointId,
                            Name = o.SalesPoint.Name,
                            Address = new AddressDto
                            {
                                City = o.SalesPoint.Address.City,
                                Street = o.SalesPoint.Address.Street,
                                PostalCode = o.SalesPoint.Address.PostalCode,
                                Number = o.SalesPoint.Address.Number,
                                County = new County
                                {
                                    Id = o.SalesPoint.Address.CountyId,
                                    Name = o.SalesPoint.Address.County.Name
                                }
                            }
                        }
                    });
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
                    .Select(o => new OfferDto
                    {
                        Id = o.Id,
                        Price = o.Price,
                        Product = new ProductDto
                        {
                            Name = o.Product.Name,
                            Category = new CategoryDto
                            {
                                Id = o.Product.CategoryId,
                                Name = o.Product.Category.Name,
                            }
                        },
                        SalesPoint = new SalesPointDto
                        {
                            Id = o.SalesPointId,
                            Name = o.SalesPoint.Name,
                            Address = new AddressDto
                            {
                                City = o.SalesPoint.Address.City,
                                Street = o.SalesPoint.Address.Street,
                                PostalCode = o.SalesPoint.Address.PostalCode,
                                Number = o.SalesPoint.Address.Number,
                                County = new County
                                {
                                    Id = o.SalesPoint.Address.CountyId,
                                    Name = o.SalesPoint.Address.County.Name
                                }
                            }
                        }
                    });
        }

        public IEnumerable<CommentDto>? GetAllComments(int offerId)
        {
            return _dbContext
                .Comments
                .Where(c => c.OfferId == offerId)
                .Include(c => c.User)
                .Select(c => new CommentDto
                {
                    Author = c.User.Name,
                    Likes = c.Likes,
                    DisLikes = c.Dislikes,
                    Content = c.Content
                });

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
            if (offer == null) throw new NotFoundException("Offer with requsted id does not exist");
            return offer;
        }

        private Product GetProductById(int id)
        {
            var product = _dbContext
                .Products
                .Where(p => p.Id == id)
                .FirstOrDefault();

            if (product == null)
                throw new NotFoundException("Product with requested id does not exist");
            return product;
        }

        private SalesPoint GetSalesPointById(int id)
        {
            var salesPoint = _dbContext.SalesPoints
                .Where(s => s.Id == id)
                .FirstOrDefault();

            if (salesPoint == null)
                throw new NotFoundException("SalesPoint with requested id does not exist");
            return salesPoint;
        }

    }
}
