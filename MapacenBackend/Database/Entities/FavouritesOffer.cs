
namespace MapacenBackend.Entities
{
    public class FavouritesOffer
    {
        public int OfferId { get; set; }
        public virtual Offer Offer { get; set; }
        public int FavouritesId { get; set; }
        public virtual Favourites Favourites { get; set; }
    }
}
