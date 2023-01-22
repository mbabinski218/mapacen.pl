namespace MapacenBackend.Models.OfferDtos
{
    public class OffersWithTotalCount
    {
        public int Count { get; set; }
        public IEnumerable<OfferDto>? Offers { get; set; }
    }
}
