
namespace MapacenBackend.Entities;

public class Offer
{
    public int Id { get; set; }
    public decimal Price { get; set; }
    public int ProductId { get; set; }
    public virtual Product Product { get; set; }
    public int SalesPointId { get; set; }
    public virtual SalesPoint SalesPoint { get; set; }
    public virtual List<Comment> Comments { get; set; }
    //public virtual List<Favourites> Favourites { get; set; }
    public virtual List<FavouritesOffer>? FavouritesOffer { get; set; }
}