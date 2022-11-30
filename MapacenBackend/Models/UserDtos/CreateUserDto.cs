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
    [PasswordPropertyText]
    public string Password { get; set; }
    
    [Required]
    public County County { get; set; }
}