namespace MapacenBackend.Entities;

public class Comment
{
    public int Id { get; set; }
    public string Content { get; set; }
    public int Likes { get; set; }
    public int Dislikes { get; set; }
    public int UserId { get; set; }
    public virtual User User { get; set; }
    public int OfferId { get; set; }
    public virtual Offer Offer { get; set; }
    public DateTime CreationDate { get; set; }
    public virtual List<Likers>? Likers { get; set; }
    public virtual List<Dislikers>? Dislikers { get; set; }
}