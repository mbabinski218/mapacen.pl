namespace MapacenBackend.Entities;

public class SalesPoint
{
    public int Id { get; set; }
    public string Name { get; set; }     
    public int AddressId { get; set; }
    public Address Address { get; set; }
    public virtual List<Offer> Offers { get; set; }
}