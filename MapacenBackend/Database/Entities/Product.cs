using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations.Schema;

namespace MapacenBackend.Entities;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int CategoryId { get; set; }
    public virtual Category Category { get; set; }
    public virtual List<Offer> Offers { get; set; }
    //public virtual ProductPicture ProductPicture { get; set; }
    public string ImageName { get; set; }

    //[NotMapped]
    //[FromForm]
    //public virtual IFormFile ProductPicture { get; set; }
}