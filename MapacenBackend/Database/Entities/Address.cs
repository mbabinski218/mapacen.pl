namespace MapacenBackend.Entities;

public class Address
{
    public int Id { get; set; }
    public string City { get; set; }
    public string Street { get; set; }
    public string PostalCode { get; set; }
    public int Number { get; set; }
    public int CountyId { get; set; }
    public virtual County County { get; set; }

}