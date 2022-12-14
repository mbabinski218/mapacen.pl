using System.ComponentModel.DataAnnotations;

namespace MapacenBackend.Entities;

public class User
{
    public int Id { get; set; }
    public int RoleID { get; set; }
    public virtual Role Role { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
    public bool CanComment { get; set; }
    public byte[] PasswordHash { get; set; }
    public byte[] PasswordSalt { get; set; }
    public County County { get; set; }
    public int CountyId { get; set; }
    public string? RefreshToken { get; set; }
    public DateTime? TokenCreated { get; set; }
    public DateTime? TokenExpires { get; set; }
    public virtual List<Comment> Comments { get; set; }

    //TODO referencja do ulubionych
}