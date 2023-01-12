

namespace MapacenBackend.Entities
{
    public class Favourites
    {
        public int Id { get; set; }
        public virtual List<FavouritesOffer>? FavouritesOffer { get; set; }
    }
}