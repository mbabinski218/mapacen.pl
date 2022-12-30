using MapacenBackend.Entities;
using MapacenBackend.Models.CommentDtos;
using MapacenBackend.Models.OfferDtos;
using MapacenBackend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MapacenBackend.Controllers
{
    [Route("api/offer")]
    [ApiController]
    public class OfferController : ControllerBase
    {
        private readonly IOfferService _service;

        public OfferController(IOfferService service)
        {
            _service = service;
        }

        [HttpPost]
        public ActionResult<int> AddOffer([FromBody] CreateOfferDto dto)
        {
            var offerId = _service.AddOffer(dto);
            return Created($"api/offer/{offerId}", null);
        }

        [HttpGet]
        public ActionResult<IEnumerable<OfferDto>> GetOffers(int countyId, string productName, int? categoryId, int pageSize, int pageNumber)
        {
            return Ok(_service.GetOffers(countyId, productName, categoryId, pageSize, pageNumber));
        }

        [HttpGet("comments/{offerId}")]
        public ActionResult<IEnumerable<CommentDto>> GetAllComments([FromRoute] int offerId)
        {
            return Ok(_service.GetAllComments(offerId));
        }

        [HttpPost("favourites")]
        public ActionResult AddOfferToFavorites([FromQuery] int offerId, [FromQuery] int favoritesId)
        {
            _service.AddOfferToFavourites(offerId, favoritesId);
            return Ok();
        }

        [HttpGet("favourites/{favouritesId}")]
        public ActionResult<IEnumerable<OfferDto>?> GetFavouritesOffers([FromRoute] int favouritesId)
        {
            return Ok(_service.GetFavouritesOffers(favouritesId));
        }
    }
}
