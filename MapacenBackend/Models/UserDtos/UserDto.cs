using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace MapacenBackend.Models.UserDtos;

public class UserDto
{
    [EmailAddress]
    public string? Email { get; set; }

    [PasswordPropertyText]
    public string? Password { get; set; }
}