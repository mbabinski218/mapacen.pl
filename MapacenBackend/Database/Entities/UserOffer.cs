
namespace MapacenBackend.Entities
{
    public class UserOffer
    {
        public int OfferId { get; set; }
        public virtual Offer Offer { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
    }
}
