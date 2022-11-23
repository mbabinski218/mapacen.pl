namespace MapacenBackend.Entities;

public class Comment
{
    public int Id { get; set; }
    public int Rating { get; set; }
    public string Content { get; set; }
    public int UserId { get; set; }
    public virtual User Author { get; set; }
}