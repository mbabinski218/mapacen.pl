using MapacenBackend.Entities;

namespace MapacenBackend.Models.UserDtos
{
    public class UserDto
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public bool CanComment { get; set; }
        public string RoleName { get; set; }
        public County County { get; set; }

    }
}
