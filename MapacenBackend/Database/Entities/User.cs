namespace MapacenBackend.Entities;

public class User
{
    public int Id { get; set; }
    public int RoleID { get; set; }
    public virtual Role Role { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
    public bool CanComment { get; set; }
    public string PasswordHash { get; set; }
    public County County { get; set; }
    public int CountyId { get; set; }
}