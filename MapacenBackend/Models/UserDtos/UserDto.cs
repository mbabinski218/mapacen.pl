using MapacenBackend.Entities;

namespace MapacenBackend.Models.UserDtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public bool CanComment { get; set; }
        public string RoleName { get; set; }
        public CountyDto County { get; set; }

    }
}
