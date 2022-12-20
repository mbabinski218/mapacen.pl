namespace MapacenBackend.Models
{
    public class TokenToReturn
    {
        public string TokenContent { get; set; }

        public TokenToReturn(string TokenContent)
        {
            this.TokenContent = TokenContent;
        }
    }
}
