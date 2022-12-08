using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace MapacenBackend.Models.UserDtos;

public class UserDto
{
    [EmailAddress]
    public string? Email { get; set; }

    public string? Password { get; set; }
}