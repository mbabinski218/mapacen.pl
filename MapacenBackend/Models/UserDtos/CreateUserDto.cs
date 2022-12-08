using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using MapacenBackend.Entities;

namespace MapacenBackend.Models.UserDtos;

public class CreateUserDto
{
    [Required]
    [MaxLength(128)]
    [MinLength(1)]
    public string Name { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string Password { get; set; }

    [Required]
    [Compare("Password")]
    public string ConfirmedPassword { get; set; }

    [Required]
    public int CountyId { get; set; }

    public int RoleId { get; set; } = 1;
}