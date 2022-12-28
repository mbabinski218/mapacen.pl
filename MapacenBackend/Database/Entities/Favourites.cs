using MapacenBackend.Entities;

namespace MapacenBackend.Database.Entities
{
    public class Favourites
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
        public virtual List<Offer> Offer { get; set; }

    }
}
