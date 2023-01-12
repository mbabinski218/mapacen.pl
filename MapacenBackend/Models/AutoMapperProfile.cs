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
            CreateMap<Comment, CommentDto>()
                .ForMember(dto => dto.Author, c => c.MapFrom(c => c.User.Name))
            .ForMember(dto => dto.AuthorId, c => c.MapFrom(c => c.User.Id));
            CreateMap<CreateCommentDto, Comment>();

            //Offer
            CreateMap<Offer, OfferDto>();
            CreateMap<CreateOfferDto, Offer>();

            //County
            CreateMap<County, CountyDto>();

            //Product
            CreateMap<Product, ProductDto>();
            CreateMap<CreateProductDto, Product>();

            // SalesPoint
            CreateMap<SalesPoint, SalesPointDto>();
            CreateMap<CreateSalesPointDto, SalesPoint>();

            // User
            CreateMap<User, LoginUserDto>();
            CreateMap<User, UserDto>()
                .ForMember(dto => dto.RoleName, u => u.MapFrom(u => u.Role.Name));
        }
    }
}
