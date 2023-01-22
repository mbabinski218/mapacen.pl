using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using MapacenBackend.Entities;

namespace MapacenBackend.Models.UserDtos;

public class CreateUserDto
{
    [Required(ErrorMessage = "Pole jest wymagane")]
    [MaxLength(32, ErrorMessage ="Nazwa jest za długa")]
    [MinLength(1, ErrorMessage ="Niepoprawne dane")]
    public string Name { get; set; }

    [Required(ErrorMessage = "Pole jest wymagane")]
    [EmailAddress(ErrorMessage = "Niepoprawne dane")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Pole jest wymagane")]
    public string Password { get; set; }

    [Required(ErrorMessage = "Pole jest wymagane")]
    [Compare("Password", ErrorMessage ="Hasła nie są takie same")]
    public string ConfirmedPassword { get; set; }

    [Required(ErrorMessage = "Pole jest wymagane")]
    public int CountyId { get; set; }

    public int RoleId { get; set; } = 1;
}