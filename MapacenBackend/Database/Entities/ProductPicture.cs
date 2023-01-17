using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations.Schema;

namespace MapacenBackend.Entities
{
    public class ProductPicture
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
        public virtual Product Product { get; set; }
    }
}
