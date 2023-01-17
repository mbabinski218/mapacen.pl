using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace MapacenBackend.Models.UserDtos;

public class LoginUserDto
{
    [EmailAddress(ErrorMessage ="Niepoprawny format")]
    public string? Email { get; set; }

    public string? Password { get; set; }
}