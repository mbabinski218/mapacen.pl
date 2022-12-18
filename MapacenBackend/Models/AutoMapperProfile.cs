using AutoMapper;
using MapacenBackend.Entities;
using MapacenBackend.Models.AddressDtos;
using MapacenBackend.Models.CategoryDtos;
using MapacenBackend.Models.CommentDtos;
using MapacenBackend.Models.OfferDtos;
using MapacenBackend.Models.ProductDtos;
using MapacenBackend.Models.SalesPointDtos;
using MapacenBackend.Models.UserDtos;

namespace MapacenBackend.Models
{
    public class AutoMapperProfile : Profile
    { 
        public AutoMapperProfile()
        {
            // Address
            CreateMap<Address, AddressDto>();
            CreateMap<CreateAddressDto, Address>();

            // Category
            CreateMap<Category, CategoryDto>();
            CreateMap<CreateCategoryDto, Category>();

            // Comment
            CreateMap<Comment, CommentDto>();
            CreateMap<CreateCommentDto, Comment>();

            //Offer
            CreateMap<Offer, OfferDto>();
            CreateMap<CreateOfferDto, Offer>();

            //Product
            CreateMap<Product, ProductDto>();
            CreateMap<CreateProductDto, Product>();

            // SalesPoint
            CreateMap<SalesPoint, SalesPointDto>();
            CreateMap<CreateSalesPointDto, SalesPoint>();

            // User
            CreateMap<User, UserDto>();
        }
    }
}
